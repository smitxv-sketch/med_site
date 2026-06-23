# JSON-First LLM Enrichment Pipeline: Production Architecture 2026

> TypeScript / Node.js / Zod · Multi-provider (DeepSeek, OpenRouter, Claude, Gemini, OpenAI) · Multi-phase enrichment

***

## Executive Summary

Проблемы с надёжностью JSON-ответов в reasoning-моделях — не баги конкретной модели, а системная особенность: reasoning-модели генерируют CoT-трассу до финального ответа, что создаёт дополнительные точки отказа (вывод в `reasoning_content`, а не в `content`; обёртки; частичный JSON). Решение — многослойная архитектура: **Provider Adapter → Structured Output Engine → JSON Extraction → Phase Normalizer → Zod Validate + Repair**. Каждый слой изолирован, имеет чёткий контракт и собственную observability. Такой пайплайн переживает смену провайдера без изменения бизнес-логики.[^1][^2][^3][^4][^5][^6]

***

## 1. Архитектурные слои: Responsibilities и Контракты

### 1.1 Слоёная схема

```
┌──────────────────────────────────────────────────────┐
│  PHASE RUNNER (analysis, seo, objections, …)         │
│  PhaseConfig: schema + prompt + retryPolicy          │
└───────────────────────┬──────────────────────────────┘
                        │ EnrichmentRequest
                        ▼
┌──────────────────────────────────────────────────────┐
│  STRUCTURED OUTPUT ENGINE (capability-aware)         │
│  Выбирает стратегию: json_schema / tool_use /        │
│  json_object / text → query PhaseNormalizerRegistry  │
└───────────────────────┬──────────────────────────────┘
                        │ ProviderRequest
                        ▼
┌──────────────────────────────────────────────────────┐
│  PROVIDER ADAPTER LAYER                              │
│  DeepSeekAdapter | OpenRouterAdapter |               │
│  ClaudeAdapter   | GeminiAdapter | OpenAIAdapter     │
│  Нормализует ответ → RawLLMResponse                  │
└───────────────────────┬──────────────────────────────┘
                        │ RawLLMResponse
                        ▼
┌──────────────────────────────────────────────────────┐
│  JSON EXTRACTION + CANDIDATE RANKING                 │
│  Multi-strategy extractor → ranked candidates        │
└───────────────────────┬──────────────────────────────┘
                        │ JsonCandidate[]
                        ▼
┌──────────────────────────────────────────────────────┐
│  ZOD VALIDATION + REPAIR LOOP (max 2 retries)        │
│  pass → PhaseResult                                  │
│  fail → RepairPrompt → back to Engine                │
└───────────────────────┬──────────────────────────────┘
                        │ PhaseResult | PhaseError
                        ▼
┌──────────────────────────────────────────────────────┐
│  OBSERVABILITY SINK (OTel spans + custom metrics)    │
└──────────────────────────────────────────────────────┘
```

### 1.2 Provider Adapter Layer

**Responsibility:** изолировать всю provider-специфику. Никакой код выше этого слоя не знает об API-ключах, форматах ответа, полях `reasoning_content`, `<think>` тегах, или конкретных SDK.

**Контракт:**

```typescript
// Входящий контракт — одинаков для всех провайдеров
interface ProviderRequest {
  messages: ChatMessage[];
  model: string;
  responseFormat: ResponseFormatHint; // json_schema | json_object | text
  schema?: JSONSchema;                // опционально, если провайдер поддерживает
  maxTokens: number;
  temperature: number;
  extra?: Record<string, unknown>;    // provider-specific passthrough
}

// Исходящий контракт — всегда один и тот же
interface RawLLMResponse {
  content: string;           // ТОЛЬКО финальный контент (без CoT)
  reasoning?: string;        // CoT, если был (для логов/observability)
  finishReason: 'stop' | 'length' | 'error';
  usage: TokenUsage;
  providerMeta: ProviderMeta; // model, latency, cost estimate
}
```

**DeepSeek-specific logic** (внутри адаптера, не снаружи):

```typescript
class DeepSeekDirectAdapter implements ProviderAdapter {
  async complete(req: ProviderRequest): Promise<RawLLMResponse> {
    const resp = await this.client.chat.completions.create({ ... });
    const msg = resp.choices.message;
    
    // KEY: reasoning-модели возвращают reasoning_content отдельно
    const content = msg.content ?? '';
    const reasoning = (msg as any).reasoning_content ?? undefined;
    
    // Если content пустой — это known issue DeepSeek JSON mode
    // Пробуем извлечь из reasoning как fallback
    const finalContent = content.trim() 
      ? content 
      : this.extractFromReasoning(reasoning ?? '');
    
    return {
      content: finalContent,
      reasoning,
      finishReason: resp.choices.finish_reason as any,
      usage: { inputTokens: resp.usage.prompt_tokens, 
               outputTokens: resp.usage.completion_tokens },
      providerMeta: { provider: 'deepseek-direct', model: req.model }
    };
  }
  
  private extractFromReasoning(text: string): string {
    // Если модель "думала JSON" но выдала пустой content
    // ищем последний валидный JSON-блок в reasoning
    return JsonExtractor.findCandidates(text)?.raw ?? '';
  }
}
```

**OpenRouter-specific:** Via OpenRouter reasoning-модели упаковывают CoT в `<think>...</think>` теги внутри `content` (в отличие от отдельного поля у DeepSeek direct). Адаптер стрипает теги и возвращает clean content.[^7]

```typescript
class OpenRouterAdapter implements ProviderAdapter {
  async complete(req: ProviderRequest): Promise<RawLLMResponse> {
    // ... API call ...
    const raw = resp.choices.message.content ?? '';
    
    // Стрипаем <think> блоки, характерные для OpenRouter reasoning
    const thinkMatch = raw.match(/^<think>([\s\S]*?)<\/think>\s*([\s\S]*)$/);
    const reasoning = thinkMatch?.[^1];
    const content = thinkMatch?.[^2] ?? raw;
    
    return { content, reasoning, ... };
  }
}
```

### 1.3 Structured Output Engine (capability-aware)

**Responsibility:** выбирать оптимальную стратегию запроса к провайдеру на основе capability matrix. Это единственный слой, который знает "что данный провайдер умеет".

```typescript
type StructuredStrategy =
  | 'native_json_schema'   // OpenAI, Gemini, Claude 4.5+ (guaranteed)
  | 'tool_use'             // Claude tool_choice=forced (pre-4.5)
  | 'json_object'          // json_object mode + schema in prompt
  | 'text_with_extraction' // fallback: plain text + aggressive extraction

interface CapabilityMatrix {
  provider: ProviderName;
  model: string;
  supports: {
    nativeJsonSchema: boolean;
    toolUse: boolean;
    jsonObject: boolean;
    streamingStructured: boolean;
  };
  knownIssues: string[]; // e.g., "empty_content_on_json_mode"
}
```

Логика выбора стратегии:

```typescript
function selectStrategy(
  provider: ProviderName,
  model: string,
  schema: ZodSchema | null
): StructuredStrategy {
  const caps = capabilityRegistry.get(provider, model);
  
  if (schema && caps.supports.nativeJsonSchema) return 'native_json_schema';
  if (schema && caps.supports.toolUse) return 'tool_use';
  if (caps.supports.jsonObject) return 'json_object';
  return 'text_with_extraction';
}
```

### 1.4 JSON Extraction + Candidate Ranking

**Responsibility:** из сырого текста ответа извлечь все JSON-кандидаты и выбрать наиболее подходящий.

**Ключевой принцип — "root object vs inner fragment"**: нужно отличить корневой JSON-объект фазы от JSON, который может быть вложен внутри другого JSON или в тексте пояснений.[^8][^9]

**Multi-strategy экстракция (в порядке приоритета):**

1. **Прямой parse** — если весь `content` после trim это валидный JSON
2. **Fence extraction** — стрипаем ` ```json ... ``` ` или ` ``` ... ``` `
3. **Balanced brace extraction** — ищем `{...}` с matching брейсами (bracket-counting)
4. **Last-complete-object** — в случае truncation ищем `rfind('}')` и пробуем parse подстроки[^9]

**Ranking алгоритм — отдаёт приоритет корневому объекту:**

```typescript
interface JsonCandidate {
  raw: string;
  parsed: unknown;
  score: number;   // 0-100
  source: 'direct' | 'fence' | 'brace_match' | 'last_complete';
}

function rankCandidates(
  candidates: JsonCandidate[],
  schema: ZodSchema
): JsonCandidate[] {
  return candidates.map(c => ({
    ...c,
    score: computeScore(c, schema)
  })).sort((a, b) => b.score - a.score);
}

function computeScore(c: JsonCandidate, schema: ZodSchema): number {
  let score = 0;
  
  // +40: проходит safeParse (частичное совпадение ключей)
  const partial = schema.partial().safeParse(c.parsed);
  if (partial.success) score += 40;
  
  // +30: все required ключи присутствуют на корневом уровне
  const requiredKeys = getRequiredKeys(schema);
  const presentKeys = Object.keys(c.parsed as object ?? {});
  const coverage = presentKeys.filter(k => requiredKeys.includes(k)).length / requiredKeys.length;
  score += coverage * 30;
  
  // +20: это объект (не массив, не примитив)
  if (typeof c.parsed === 'object' && !Array.isArray(c.parsed)) score += 20;
  
  // +10: прямой parse (не извлечённый из текста)
  if (c.source === 'direct') score += 10;
  
  // -20: penalty если внутри есть другой вложенный JSON такого же shape
  // (признак внутреннего фрагмента)
  if (isInnerFragment(c, schema)) score -= 20;
  
  return score;
}
```

**Определение inner fragment:** если в parsed объекте есть поля, значения которых сами являются объектами с теми же ключами, что в schema — это, скорее всего, вложенный фрагмент, а не корневой объект.

### 1.5 Phase Normalizer Profiles

**Responsibility:** фазо-специфические трансформации после извлечения JSON, но до Zod-валидации. Позволяет адаптировать вывод модели под конкретную фазу без изменения схемы.

```typescript
interface PhaseNormalizerProfile {
  phase: PhaseKey; // 'analysis' | 'seo' | 'arguments' | ...
  
  // Pre-validation transforms
  preTransform?: (raw: unknown) => unknown;
  
  // Alias resolution: модель иногда называет поля иначе
  fieldAliases?: Record<string, string[]>; 
  // e.g., { "summary": ["summery", "overview", "brief"] }
  
  // Coercion rules: строки → числа, "да"/"нет" → boolean
  coercions?: Record<string, CoercionRule>;
  
  // Allowed shrink: какие required поля можно дропнуть в крайнем случае
  shrinkableFields?: string[];
}

// Пример для фазы objections
const objectionsProfile: PhaseNormalizerProfile = {
  phase: 'objections',
  fieldAliases: {
    'objections': ['concerns', 'obstacles', 'objection_list'],
    'responses': ['answers', 'rebuttals', 'replies']
  },
  preTransform: (raw) => {
    // Модели часто возвращают массив вместо { objections: [...] }
    if (Array.isArray(raw)) return { objections: raw };
    return raw;
  }
};
```

### 1.6 Zod Validation + Repair Loop

**Responsibility:** финальная валидация + ограниченный repair prompt при fail. Ключевое ограничение: **не более 2 repair-итераций** (суммарно 3 попытки на фазу).[^10]

```typescript
async function validateAndRepair<T>(
  candidate: unknown,
  schema: ZodSchema<T>,
  phase: PhaseKey,
  engine: StructuredOutputEngine,
  originalRequest: EnrichmentRequest
): Promise<T> {
  const result = schema.safeParse(candidate);
  
  if (result.success) return result.data;
  
  if (originalRequest.attemptNumber >= 3) {
    throw new PhaseExhaustedError(phase, result.error);
  }
  
  // SAFE repair prompt — не передаём оригинальный контент целиком
  const repairPrompt = buildRepairPrompt({
    errors: result.error.issues.slice(0, 10),  // ограничиваем размер
    schemaPreview: schema.description ?? getSchemaOutline(schema), // не полный промпт
    // ВАЖНО: candidatePreview, НЕ оригинальный input (секреты могут быть там)
    candidatePreview: truncateForRepair(JSON.stringify(candidate), 2000),
  });
  
  return engine.complete({
    ...originalRequest,
    messages: [{ role: 'user', content: repairPrompt }],
    attemptNumber: originalRequest.attemptNumber + 1,
    maxTokens: originalRequest.maxTokens * 4, // 4x на repair
    temperature: 0, // детерминизм на repair
  });
}
```

**Безопасный repair prompt — не утекают секреты:**

```typescript
function buildRepairPrompt(opts: RepairOpts): string {
  // НЕ включаем: оригинальный system prompt с бизнес-логикой
  // НЕ включаем: данные клиента, API-ключи, PII
  // ВКЛЮЧАЕМ: схему (структура), ошибки валидации, preview кандидата
  return `
Fix the following JSON to match this schema outline:
${opts.schemaPreview}

Validation errors found:
${opts.errors.map(e => `- ${e.path.join('.')}: ${e.message}`).join('\n')}

Current broken JSON (truncated):
${opts.candidatePreview}

Return ONLY valid JSON, no explanation, no markdown fences.
`.trim();
}
```

### 1.7 Observability / Metrics Layer

OTel GenAI семантические конвенции стабилизировались для client spans в начале 2026 года. Используем `gen_ai.*` namespace как основу.[^11]

**Кастомные атрибуты поверх стандарта OTel:**

```typescript
// Span per phase attempt
span.setAttributes({
  // OTel GenAI standard
  'gen_ai.system': provider,          // 'deepseek' | 'openrouter' | 'anthropic'
  'gen_ai.request.model': model,
  'gen_ai.usage.input_tokens': usage.inputTokens,
  'gen_ai.usage.output_tokens': usage.outputTokens,
  
  // Custom enrichment pipeline attributes
  'enrichment.phase': phase,
  'enrichment.attempt': attemptNumber,
  'enrichment.strategy': strategy,     // 'native_json_schema' | 'tool_use' | ...
  'enrichment.extraction_source': extractionSource, // 'direct' | 'fence' | ...
  'enrichment.parse_success': parseSuccess,
  'enrichment.schema_pass': schemaPass,
  'enrichment.finish_reason': finishReason,  // 'stop' | 'length' ← critical!
  'enrichment.candidate_rank': selectedCandidateRank,
});
```

**События (span events), не атрибуты — для большого контента:**

```typescript
// Никогда не логируем полный prompt/completion в атрибутах!
span.addEvent('enrichment.repair_triggered', {
  'error.count': errors.length,
  'error.preview': errors.slice(0, 3).map(e => e.message).join('; '),
  // НЕ 'original_prompt' — может содержать PII/секреты
});
```

***

## 2. Decision Matrix: Провайдеры и Стратегии

### 2.1 Сводная таблица

| Провайдер / Модель | Native json_schema | JSON Object Mode | CoT/Reasoning поле | Рекомендованная цепочка | Fallback |
|---|---|---|---|---|---|
| **DeepSeek V4-Pro (direct)** | ✅ (V4, не R1) | ✅ | `reasoning_content` (отдельное поле)[^2][^3] | `native_json_schema` (V4) → `json_object` + schema-in-prompt | repair loop × 2 |
| **DeepSeek-Reasoner R1 (direct)** | ❌ [^7] | ⚠️ (иногда пустой content)[^12] | `reasoning_content` отдельно | `json_object` + "extract from reasoning" fallback | text_with_extraction |
| **OpenRouter → DeepSeek** | ⚠️ не гарантировано [^13][^14] | ✅ | CoT в `<think>` тегах в content [^7] | `require_parameters=true` + `json_schema` + стрип `<think>` | `json_object` |
| **OpenRouter (general)** | ✅ (для совместимых моделей)[^15] | ✅ | varies по модели | Проверять `supported_parameters` через `/api/v1/models` [^13] | `json_object` + extraction |
| **Claude Sonnet 4.5 / Opus 4.1** | ✅ (structured outputs beta)[^16][^17] | через tool_use | нет CoT | `native_json_schema` через structured outputs → tool_use принудительный | prompt engineering + extraction |
| **Claude (pre-4.5 / старые)** | ❌ | через tool_use [^18] | нет | `tool_use` forced + `input_schema` | prefill `{"` в assistant turn |
| **Gemini 2.5+ (direct)** | ✅ first-class [^19][^20] | ✅ | нет | `response_schema` + `response_mime_type=application/json` | `json_object` |
| **Gemini via OpenRouter** | ✅ (обычно работает)[^13] | ✅ | нет | `json_schema` + `require_parameters` | native Gemini SDK |
| **OpenAI GPT-4o+ / o-series** | ✅ первоклассно [^18] | ✅ | нет (o-series скрывает CoT) | `json_schema` + `strict=true` | `json_object` |

### 2.2 DeepSeek Direct: детали

DeepSeek разделяет V-серию (chat-модели) и R-серию (reasoning):[^2]
- **deepseek-chat (V4)** — поддерживает `response_format: {type: "json_object"}`, иногда возвращает пустой content (known bug, требует retry)[^12]
- **deepseek-reasoner (R1)** — JSON Output **не поддерживается** официально; рабочий паттерн: `json_object` + схема в промпте + extraction из `reasoning_content` как fallback[^7]
- В многотурновом диалоге `reasoning_content` **нельзя** передавать обратно в messages (ошибка 400)[^2]

**Рекомендованная стратегия для DeepSeek V4:**
```
A: json_object mode + schema в system prompt + "json" в user prompt
B: На пустом content → extract из reasoning_content
C: На "length" finish_reason → split schema (см. §3.2)
D: На 3 fail → fallback к другому провайдеру
```

### 2.3 OpenRouter: типовые риски и митигация

**Риски OpenRouter** при работе со structured outputs:[^13][^14][^7]
1. **Provider capability mismatch** — OpenRouter может маршрутизировать к провайдеру, который не поддерживает `json_schema`, и тихо деградировать до `json_object`
2. **CoT format differences** — одна модель, разные провайдеры: DeepSeek direct даёт `reasoning_content`, Fireworks даёт `<think>` теги[^7]
3. **Response healing** — OpenRouter предлагает built-in "Response Healing" плагин для `json_schema` ответов, но он работает только для non-streaming[^15]

**Митигация:**
```typescript
// Всегда проверять capability перед json_schema запросом
const modelSupportsSchema = await openRouterModels
  .fetchSupported({ parameter: 'structured_outputs' })
  .includes(modelId);

// В provider preferences
{
  "require_parameters": true,    // НЕ роутить к провайдерам без json_schema
  "response_format": { "type": "json_schema", ... }
}
```

### 2.4 Claude: Structured Outputs vs Tool Use

Claude Sonnet 4.5 и Opus 4.1 получили **native structured outputs** (public beta, ноябрь 2025):[^16]
- Гарантированное schema compliance через constrained decoding
- Два режима: через `response_format` (JSON) или через `tools` (tool_use)[^17]
- Prefill `Assistant:` turn (`{"`) — помогает на старых моделях, **не поддерживается** на Claude 4.5+[^21]

```typescript
// Для Claude 4.5+ — native structured outputs
{
  "model": "claude-sonnet-4-5",
  "messages": [...],
  "response_format": {
    "type": "json_schema",
    "json_schema": zodToJsonSchema(phaseSchema)
  }
}

// Для Claude pre-4.5 — tool_use fallback
{
  "tools": [{ "name": "extract_phase", "input_schema": zodToJsonSchema(phaseSchema) }],
  "tool_choice": { "type": "tool", "name": "extract_phase" }
}
```

### 2.5 Gemini: schema и порядок ключей

Gemini 2.5+ поддерживает полный JSON Schema включая `anyOf`, `$ref`, `minimum/maximum`. Важная деталь: **Gemini сортировал ключи алфавитно** (известная проблема), но с обновлением ноября 2025 порядок ключей сохраняется согласно схеме. Это критично для CoT-over-JSON паттернов (где `reasoning` должен идти первым). Zod + Google GenAI SDK работают "из коробки" с Gemini 2.5.[^22][^19][^20]

***

## 3. Best Practices

### 3.1 Предотвращение обрезки JSON (truncation)

Обрезка JSON — одна из самых дорогих ошибок, потому что retry стоит полного набора токенов.[^23][^24]

**Практические правила:**

1. **Всегда проверяй `finish_reason`** перед парсингом: если `"length"` — JSON гарантированно обрезан. Не пытайся парсить, сразу retry с большим `max_tokens` или сплитом схемы.

2. **Estimate output size заранее** — каждая фаза знает примерный размер своего JSON. Накладывай safety margin × 2:
   ```typescript
   const estimatedOutputTokens = estimateJsonTokens(schema) * 2;
   const maxTokens = Math.min(estimatedOutputTokens, modelMaxOutput);
   ```

3. **Split heavy schemas** — фазы типа `presentation` или `subtitles` (много items) стоит разбить:
   - Сначала: `{ metadata: ..., structure: [...] }` (без контента)
   - Потом: `{ items: [...] }` (контент отдельными чанками)
   
4. **Shallow over deep** — не вкладывай объекты глубже 2–3 уровней. Плоские схемы обрезаются реже и проще repair.[^25][^26]

5. **На repair — 4x max_tokens** с `temperature: 0`.[^23]

### 3.2 Root Object vs Inner Fragment

Модели иногда возвращают JSON, который является лишь частью ожидаемой структуры (например, один элемент массива вместо всего массива, или вложенный sub-object).

**Эвристики для обнаружения inner fragment:**
- Присутствуют только поля одного вложенного уровня схемы, но не корневые ключи
- Объект не содержит ни одного из обязательных корневых ключей
- Размер объекта << ожидаемого (по количеству ключей)

```typescript
function isInnerFragment(candidate: unknown, schema: ZodSchema): boolean {
  if (typeof candidate !== 'object' || candidate === null) return false;
  const topKeys = getRequiredKeys(schema); // ожидаемые root-ключи
  const actualKeys = Object.keys(candidate);
  
  // Если ни один root-ключ не присутствует — это, скорее, inner fragment
  const overlap = actualKeys.filter(k => topKeys.includes(k));
  return overlap.length === 0 && actualKeys.length > 0;
}
```

### 3.3 Дизайн Schema под надёжность

| Принцип | Плохо | Хорошо |
|---|---|---|
| Nullable vs Required | `field: z.string().optional()` везде — модель пропускает поля | `field: z.string()` — required + `.describe("обязательно, даже пустая строка")` |
| Глубина вложенности | `analysis.sub.deep.nested.value` | `analysis_sub_deep_nested_value` (flat) |
| Enum vs string | `z.string()` для статусов | `z.enum(['low','medium','high'])` — сужает вероятность галлюцинаций |
| Описания | Нет `.describe()` | Каждое поле с `.describe()` — помогает модели[^15] |
| Размер | Все фазы в одной схеме | Один объект = одна фаза, max 15–20 полей |
| Массивы | `items: z.array(z.object({...}))` без ограничений | `items: z.array(z.object({...})).min(1).max(10)` |

**Nullable trap:** если поле `nullable`, модель может вернуть `null` вместо нужного значения, что пройдёт Zod, но сломает downstream логику. Лучше `required` + `.describe("если неизвестно, верни пустую строку")`.

### 3.4 Repair Prompting: безопасность

Три правила безопасного repair:[^27][^28][^29]

1. **Никаких секретов в repair промпте.** Оригинальный system prompt с бизнес-логикой, PII клиента, ключи API — всё это остаётся вне repair. Repair получает только: схему (структуру, не данные), список ошибок валидации, preview сломанного кандидата.

2. **Ограничивай размер кандидата** — `candidatePreview: truncateForRepair(json, 2000)`. Длинный сломанный JSON в repair prompt часто путает модель.

3. **Хранить preview, не полный контент** — в observability логах для repair: `{ "candidate_preview": firstN(candidate, 500), "errors": [...] }`, не полный кандидат.

***

## 4. Plan внедрения (итерации) + Метрики

### 4.1 Дорожная карта

**Итерация 0 — Quick Win (1–2 дня, ~80% проблем решаются):**
- [ ] Добавить проверку `finish_reason === 'length'` перед парсингом → retry с большим max_tokens
- [ ] Стрипать ` ```json ``` ` фенсы и prose обёртки перед `JSON.parse()`
- [ ] В DeepSeek-адаптере добавить read из `reasoning_content` при пустом `content`
- [ ] Логировать `finish_reason` и `extraction_source` для каждого запроса

**Итерация 1 — Provider Adapter (3–5 дней):**
- [ ] Вынести все provider-специфичные вызовы в отдельные adapter-классы
- [ ] Единый `RawLLMResponse` интерфейс — весь код выше слоя перестаёт знать о провайдерах
- [ ] CapabilityRegistry с текущей матрицей (таблица §2.1)
- [ ] Начать собирать метрики: `parse_success_rate`, `schema_pass_rate` per phase per provider

**Итерация 2 — JSON Extraction + Candidate Ranking (3–4 дня):**
- [ ] Multi-strategy extractor (§1.4)
- [ ] Candidate scoring + root object vs inner fragment detection
- [ ] Phase Normalizer Profiles для самых проблемных фаз (objections, subtitles)
- [ ] Метрика `retries_per_phase` — видим, какие фазы systemically проблемны

**Итерация 3 — Structured Output Engine + Repair Loop (5–7 дней):**
- [ ] Capability-aware strategy selection
- [ ] Repair loop с ограничением 2 итерации
- [ ] Safe repair prompt (без секретов, с preview)
- [ ] Per-phase `max_tokens` estimation + split heavy schemas

**Итерация 4 — Observability (2–3 дня):**
- [ ] OTel GenAI semantic conventions (`gen_ai.*` spans)[^30][^31]
- [ ] Dashboard: parse_success_rate / schema_pass_rate / retries_per_phase / p95 latency / cost_per_car
- [ ] Alerts на аномалии: `schema_pass_rate < 90%`, `finish_reason=length > 5%`

### 4.2 Метрики успеха

| Метрика | Базовое состояние (before) | Target (after iter 3) | Как измерять |
|---|---|---|---|
| `parse_success_rate` | ~60–70% (reasoning models) | >97% | JSON.parse success / total |
| `schema_pass_rate` | ~50–65% | >95% | Zod.safeParse.success / total |
| `retries_per_phase` | 1.5–2.0 avg | <0.3 avg | sum(attempts-1) / total_phases |
| `finish_reason=length` | неизвестно | <3% | count(length) / total |
| `p95_time_per_phase` | неизвестно | baseline × 1.1 | OTel span duration p95 |
| `cost_per_car` | baseline | -15% (за счёт меньше retry) | usage tokens × price |
| `repair_triggered_rate` | — | <8% | repair_attempts / total |

**Что логировать как события (structured events в Prisma/DB или OTel):**

```typescript
interface EnrichmentEvent {
  carId: string;
  phase: PhaseKey;
  provider: string;
  model: string;
  strategy: StructuredStrategy;
  attemptNumber: number;
  finishReason: string;
  extractionSource: string;
  parseSuccess: boolean;
  schemaPass: boolean;
  repairTriggered: boolean;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
  errorCode?: string;
  timestamp: Date;
}
```

### 4.3 Canary Deployment: план прогона 1→3→7 авто

Canary для LLM-пайплайнов — это трафик-сплит на уровне промптов/стратегий, не только кода:[^32][^33]

**Этапы:**

```
Неделя 1: 1 авто (internal test set — авто с известными корректными результатами)
  → Метрики должны быть >= baseline на ВСЕХ фазах
  → Нет новых error_codes
  → finish_reason=length = 0%

Неделя 2: 3 авто (смешанный набор: простое + сложное описание + edge case)
  → schema_pass_rate >= 95% на каждой фазе
  → retries_per_phase < 0.5
  → Нет регрессии по format_validity vs baseline

Неделя 3: 7 авто (случайная выборка из production очереди)
  → Автоматический rollback trigger: если parse_success_rate < 90% на любой фазе
  → Сравнение semantic quality через LLM-judge на golden set
  → Если OK → 100% traffic
```

**Rollback triggers (автоматические):**
- `parse_success_rate` падает ниже 90% на скользящем окне 30 мин
- `finish_reason=length` > 10% (признак систематической обрезки)
- Error rate > 5%

**Реализация**: feature flag + `EnrichmentRouter` который на основе `carId % 100 < canaryPercent` направляет к новому пайплайну:

```typescript
class EnrichmentRouter {
  route(carId: string, phase: PhaseKey): PipelineVersion {
    const bucket = hashMod(carId, 100);
    if (bucket < this.canaryPercent) return 'v2';
    return 'v1';
  }
}
```

***

## 5. Риски и Миtigация

| Риск | Вероятность | Impact | Mitigation |
|---|---|---|---|
| DeepSeek `content=''` на json_mode | Высокая (known bug)[^12] | Блок фазы | Adapter-level retry + reasoning_content fallback |
| OpenRouter тихо деградирует `json_schema` → `json_object`[^13] | Средняя | Пропуск схемы | `require_parameters=true`, capability check per model |
| Truncation на сложных схемах (subtitles, presentation) | Средняя | Partial JSON | `finish_reason` check + schema splitting |
| Repair prompt утечка бизнес-данных | Низкая (при правильном дизайне) | Compliance риск | Separate repair context, никакого PII в repair[^28][^29] |
| OTel GenAI semconv нестабилен | Средняя (experimental)[^34] | Dashboard breakage | Namespace custom attrs как `enrichment.*`, не `gen_ai.*` для custom fields |
| Claude structured outputs (beta) → GA breaking changes[^16] | Низкая | Schema parse break | Версионировать strategy per model_version в CapabilityRegistry |
| Смена модели на OpenRouter (роутер перенаправляет)[^13] | Средняя | Неожиданное поведение | Пиннинг конкретного провайдера через `provider.only` в preferences |

***

## Ссылки на актуальную документацию (2025–2026)

- [DeepSeek API — JSON Output Guide](https://api-docs.deepseek.com/guides/json_mode)[^12]
- [DeepSeek Reasoning Model (deepseek-reasoner)](https://api-docs.deepseek.com/guides/reasoning_model)[^2]
- [OpenRouter — Structured Outputs Guide](https://openrouter.ai/docs/guides/features/structured-outputs)[^15]
- [OpenRouter — Model supported_parameters API](https://openrouter.ai/api/v1/models?supported_parameters=structured_outputs)[^13]
- [Claude — Structured Outputs (GA Nov 2025)](https://www.claude.com/blog/structured-outputs-on-the-claude-developer-platform)[^16]
- [Claude — Increase Output Consistency (json mode docs)](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency)[^21]
- [Claude — Structured Outputs API Docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)[^17]
- [Gemini API — Structured Outputs (Nov 2025 update)](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-structured-outputs/)[^19]
- [Gemini API — Structured Output docs](https://ai.google.dev/gemini-api/docs/structured-output/)[^20]
- [OpenTelemetry — LLM Observability blog](https://opentelemetry.io/blog/2024/llm-observability/)[^35]
- [OTel GenAI Semantic Conventions 2026](https://agentmarketcap.ai/blog/2026/04/10/opentelemetry-genai-semantic-conventions-agent-observability-2026)[^30]
- [MLflow — LLM Observability Pipelines 2026](https://mlflow.org/articles/setting-up-llm-observability-pipelines-in-2026/)[^31]
- [Prompt Canary Deployments](https://tianpan.co/blog/2026-04-16-prompt-canary-deployments)[^32]
- [Zod for AI Agent Validation (2026)](https://callsphere.ai/blog/zod-ai-agent-validation-schema-first-type-safe-tool-definitions)[^36]
- [JSON Recovery Ladder (2026)](https://dev.to/gabrielanhaia/json-mode-still-fails-heres-the-recovery-ladder-55n)[^23]
- [LLM Structured Outputs: 2026 Best Practices](https://collinwilkins.com/articles/structured-output)[^10]
- [Structured Output Comparison across LLM Providers 2025](https://dev.to/rosgluk/structured-output-comparison-across-popular-llm-providers-openai-gemini-anthropic-mistral-and-k26)[^18]
- [Schema-Guided Extraction and Validation (arxiv 2025)](https://arxiv.org/html/2604.06571v1)[^25]

---

## References

1. [LLM output: Are you still parsing with regex? The 3 layers ...](https://note.com/mindorbit/n/n436ef6ee3786?hl=en-US) - You ask an LLM to "return JSON," and you pass the resulting string to `json.loads()`—that naive impl...

2. [Deepseek 推理模型 (deepseek-reasoner)](https://www.w3cschool.cn/deepseekdocs/deepseek-reasoning-model.html) - deepseek-reasoner 是 DeepSeek 推出的推理模型。在输出最终回答之前，模型会先输出一段思维链内容，以提升最终答案的准确性。我们的 API 向用户开放 deepseek-reas...

3. [DeepSeek Reasoner Thinking Mode for Math Code & Logic](https://deepseeksr1.com/reasoner/) - DeepSeek Reasoner uses step-by-step chain of thought to solve complex math, coding and logic tasks. ...

4. [Architecting Resilient LLM Interactions: A Definitive Guide ...](https://medium.com/@gtdevice/architecting-resilient-llm-interactions-a-definitive-guide-to-robust-json-handling-in-java-0caa6947ea73) - Malformed JSON leads to parsing errors, downstream failures, and costly retries. To address this, mo...

5. [How to Switch AI Providers Without Rewriting Your App](https://kkit.dev/blog/switching-ai-providers-without-rewriting) - The adapter pattern for LLM providers — how to build a provider-agnostic AI layer in TypeScript so y...

6. [Vendor lock-in Antipattern | Nagacharan Teja Tangirala](https://www.nagacharan.phd/blog/2025/java-vendor-lockin-antipattern/) - Vendor lock-in Antipattern

7. [Structured output with DeepSeek-R1: How to account for provider differences with OpenRouter?](https://www.reddit.com/r/LLMDevs/comments/1inpm0v/structured_output_with_deepseekr1_how_to_account/) - Structured output with DeepSeek-R1: How to account for provider differences with OpenRouter?

8. [Repair LLM JSON Output | fixjson.org](https://fixjson.org/guides/repair-llm-json-output) - Repair invalid JSON produced by AI or LLM responses, including markdown fences, comments, Python lit...

9. [Why JSON.parse() Fails Silently on Truncated LLM Responses (And ...](https://dev.to/nexadiag_nexa_312a4b5f603/why-jsonparse-fails-silently-on-truncated-llm-responses-and-what-i-did-about-it-3681) - Why JSON.parse() Fails Silently on Truncated LLM Responses (And What I Did About It) If...

10. [LLM Structured Outputs: Schema Validation for Real Pipelines ...](https://collinwilkins.com/articles/structured-output) - 2026 best practices for LLM structured outputs across OpenAI, Claude, Gemini, and vLLM. JSON Schema,...

11. [OpenTelemetry GenAI Conventions for AI Agents in 2026 - CallSphere](https://callsphere.ai/blog/vw3c-opentelemetry-genai-conventions-ai-agents-2026)

12. [JSON Output - DeepSeek API Docs](https://api-docs.deepseek.com/guides/json_mode) - In many scenarios, users need the model to output in strict JSON format to achieve structured output...

13. [Feature request: list structured output support on ...](https://github.com/OpenRouterTeam/openrouter-examples/issues/20) - I just added schema support to my CLI tool for accessing models: simonw/llm-openrouter#23 I don't ha...

14. [OpenRouter's API does not follow given json schema on structured outputs. Does anyone else have this problem?](https://www.reddit.com/r/LocalLLaMA/comments/1kip5qj/openrouters_api_does_not_follow_given_json_schema/) - OpenRouter's API does not follow given json schema on structured outputs. Does anyone else have this...

15. [Structured Outputs | Enforce JSON Schema in OpenRouter API Responses ...](https://openrouter.ai/docs/guides/features/structured-outputs) - Enforce JSON Schema validation on AI model responses. Get consistent, type-safe outputs and avoid pa...

16. [Structured outputs on the Claude Developer Platformwww.claude.com › blog › structured-outputs-on-the-claude-developer-plat...](https://www.claude.com/blog/structured-outputs-on-the-claude-developer-platform) - Structured outputs on the Claude Developer Platform guarantee API responses match your JSON schemas ...

17. [Structured outputs - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) - Get validated JSON results from agent workflows

18. [Structured output comparison across popular LLM providers - OpenAI, Gemini, Anthropic, Mistral and AWS Bedrock](https://dev.to/rosgluk/structured-output-comparison-across-popular-llm-providers-openai-gemini-anthropic-mistral-and-k26) - Here’s a side-by-side support comparison of structured output across popular LLM providers, plus...

19. [Improving Structured Outputs in the Gemini API - Google Blogblog.google › technology › developers › gemini-api-structured-outputs](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-structured-outputs/) - Today, we're announcing enhancements to Structured Outputs in the Gemini API.

20. [Structured output | Gemini API | Google AI for Developers](https://ai.google.dev/gemini-api/docs/structured-output/) - Learn how to generate structured JSON output with the Gemini API.

21. [Increase output consistency (JSON mode) - Claude Docsdocs.claude.com › docs › test-and-evaluate › strengthen-guardrails › increa...](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency) - Claude API Documentation

22. [OpenRouterを使ってStructured Outputの処理を共通化する方法](https://note.com/brave_quince241/n/n60a5759c8f05) - Open Routerは複数のAIモデルにアクセスできる統一インターフェースを提供する革新的なプラットフォームです。 GPT, Claude, Geminiはもちろん、最近話題のDeepSeek V3...

23. [JSON Mode Still Fails. Here's the Recovery Ladder - DEV Community](https://dev.to/gabrielanhaia/json-mode-still-fails-heres-the-recovery-ladder-55n) - JSON mode was supposed to fix this. It didn't, and the OpenAI community thread on truncation past ma...

24. [Output truncated without reason - General - vLLM Forums](https://discuss.vllm.ai/t/output-truncated-without-reason/1237) - system info key value transformers version 4.51.3 PyTorch version 2.6.0 vllm version 0.8.0 GPU 4090*...

25. [LLM-based Schema-Guided Extraction and Validation of ...](https://arxiv.org/html/2604.06571v1)

26. [Mastering JSON Prompting for LLMs](https://machinelearningmastery.com/mastering-json-prompting-for-llms/) - Learn how to control LLM outputs using JSON prompting with schema design, Python implementation, and...

27. [Prevent Prompt Leakage in LLM Applications](https://www.linkedin.com/posts/danleedata_1778106198526tllgve7bmicrosoftaiengineer-activity-7469403151297818624-n-06) - You're in an 𝗔𝗜 𝗘𝗻𝗴𝗶𝗻𝗲𝗲𝗿 interview at 𝗠𝗶𝗰𝗿𝗼𝘀𝗼𝗳𝘁. The interviewer asks: "What is prompt leakage in LL...

28. [DLP for LLM Systems: Preventing Sensitive Data Leaks in Prompts ...](https://amestris.com.au/blog/ai-data-loss-prevention) - Practical data loss prevention for LLM systems using classification, redaction, output scanning, and...

29. [07 System Prompt Leakage - owasp-llm - GitHub](https://github.com/microsoft/hve-core/blob/main/.github/skills/security/owasp-llm/references/07-system-prompt-leakage.md) - A refined collection of Hypervelocity Engineering components (instructions, prompts, agents, and ski...

30. [OpenTelemetry GenAI Semantic Conventions 2026: The Standard ...](https://agentmarketcap.ai/blog/2026/04/10/opentelemetry-genai-semantic-conventions-agent-observability-2026) - OpenTelemetry's GenAI semantic conventions are ending the fragmented era of LLM observability. Here'...

31. [Setting Up LLM Observability Pipelines in 2026](https://mlflow.org/articles/setting-up-llm-observability-pipelines-in-2026/) - Unlock efficient debugging by setting up LLM observability pipelines. Learn to trace every layer and...

32. [Prompt Canary Deployments: Ship Prompt Changes Like a ...](https://tianpan.co/blog/2026-04-16-prompt-canary-deployments) - Prompt edits are as dangerous as code deploys — but almost nobody treats them that way. Here's the t...

33. [Advanced Deployment Patterns (Canary, A/B Testing)](https://apxml.com/courses/mlops-for-large-models-llmops/chapter-4-llm-deployment-serving-optimization/advanced-llm-deployment-patterns) - Implement canary releases, A/B testing (for prompts or models), and shadow deployments for LLMs.

34. [GenAI Semantic Conventions in 2026: The 11 Attributes That Survive Across SDKs](https://dev.to/gabrielanhaia/genai-semantic-conventions-in-2026-the-11-attributes-that-survive-across-sdks-egd) - OpenTelemetry's GenAI semconv is still experimental. Here are the 11 attributes that haven't moved i...

35. [Instrument your LLM...](https://opentelemetry.io/blog/2024/llm-observability/) - Large Language Models (LLMs) are really popular right now, especially considering the wide range of ...

36. [Zod for AI Agent Validation: Schema-First Type-Safe Tool ...](https://callsphere.ai/blog/zod-ai-agent-validation-schema-first-type-safe-tool-definitions)

