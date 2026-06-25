import type { AiLayoutResponseDto } from '@med-site/contracts';
import { DEFAULT_HOME_BLOCKS } from '@med-site/contracts';

const LAYOUT_SYSTEM = `Ты AI-архитектор медицинского сайта. Верни только JSON.
Формат: { "seo": { "title": "...", "description": "..." }, "blocks": [{ "id": "...", "type": "HeroWidget", "content": {...} }] }
Виджеты: HeroWidget, FeaturesWidget, DoctorsWidget, PromotionsWidget, DirectionsWidget, GalleryWidget, ReviewsWidget.`;

function mockLayout(prompt: string): AiLayoutResponseDto {
  return {
    seo: {
      title: 'Лабораторная страница',
      description: prompt.slice(0, 160),
    },
    blocks: [
      {
        id: 'lab-hero',
        type: 'HeroWidget',
        content: { title: 'Новая страница клиники', subtitle: prompt },
      },
      ...DEFAULT_HOME_BLOCKS.slice(1, 3),
    ],
    source: 'mock',
  };
}

/** POST /studio/ai/layout — OpenRouter или mock */
export async function generateAiLayout(
  prompt: string,
  instruction?: string,
): Promise<AiLayoutResponseDto> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-chat';

  if (!apiKey) {
    return mockLayout(prompt);
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.WEB_REVALIDATE_URL ?? 'https://istochnik.smitx.ru',
        'X-Title': 'Med Site Studio',
      },
      body: JSON.stringify({
        model,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: instruction ?? LAYOUT_SYSTEM },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      console.error('[bff] OpenRouter layout error:', res.status, await res.text());
      return mockLayout(prompt);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = json.choices?.[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(text) as AiLayoutResponseDto;
    return { ...parsed, source: 'openrouter' };
  } catch (err) {
    console.error('[bff] generateAiLayout failed:', err);
    return mockLayout(prompt);
  }
}
