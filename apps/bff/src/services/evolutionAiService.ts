import type { EvolutionSuggestionDto, ExperimentDto } from '@med-site/contracts';
import { suggestExperimentWinner } from './experimentService.js';

export interface AiEvolutionInsight {
  summary: string;
  suggestions: string[];
  source: 'openrouter' | 'rules';
}

/** AI-подсказки по эксперименту (дополняет rule-based suggest) */
export async function generateEvolutionInsights(
  experiment: ExperimentDto,
): Promise<AiEvolutionInsight> {
  const ruleHint = suggestExperimentWinner(
    experiment.tenantId,
    experiment.locale,
    experiment.id,
  );

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-chat';

  if (!apiKey) {
    return {
      summary: ruleHint.reason,
      suggestions: [
        'Подтвердите победителя вручную в Studio.',
        'После подтверждения нажмите «Применить к черновику» — publish отдельно.',
      ],
      source: 'rules',
    };
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'Ты маркетинговый аналитик клиники. Кратко (3 пункта) предложи действия по A/B тесту. Не публикуй автоматически.',
          },
          {
            role: 'user',
            content: JSON.stringify({
              hypothesis: experiment.hypothesis,
              metrics: experiment.metrics,
              variants: experiment.variants.map((v) => v.label),
              ruleSuggestion: ruleHint,
            }),
          },
        ],
      }),
    });

    if (!res.ok) throw new Error(String(res.status));
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = json.choices?.[0]?.message?.content ?? ruleHint.reason;
    return {
      summary: text.slice(0, 500),
      suggestions: text.split('\n').filter(Boolean).slice(0, 5),
      source: 'openrouter',
    };
  } catch {
    return {
      summary: ruleHint.reason,
      suggestions: ['Используйте rule-based рекомендацию выше.'],
      source: 'rules',
    };
  }
}
