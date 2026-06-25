import { isStudioApp } from '@/shared/config/appTarget';

export interface GenerationParams {
  prompt: string;
  minLength?: number;
  maxLength?: number;
  instruction?: string;
  systemPrompt?: string;
}

export const aiService = {
  /**
   * Генерация контента через наш /api/generate endpoint.
   * На сервере он автоматически выберет Gemini (в песочнице) 
   * или DeepSeek (если заданы ключи).
   */
  async generate(params: GenerationParams): Promise<string> {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        throw new Error(`Хьюстон, у нас проблемы: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Ошибка генерации AI:', error);
      // Fallback-демонстрация для UI, если сервер или API недоступны
      return await mockGenerate(params);
    }
  },

  /**
   * Генерация полноценного Layout (страницы из виджетов) и SEO
   */
  async generateLayout(params: GenerationParams): Promise<any> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 seconds timeout for dev

      // Studio: единый BFF-маршрут (Wave 5 фаза 4); legacy sandbox — /api/generate-layout
      const inStudio = isStudioApp();
      const url = inStudio ? '/api/studio/ai/layout' : '/api/generate-layout';
      const body = inStudio
        ? {
            prompt: params.prompt,
            instruction: [params.instruction, params.systemPrompt].filter(Boolean).join('\n\n'),
          }
        : params;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Хьюстон, у нас проблемы: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка генерации AI Layout:', error);
      // Моковые данные для fall-back
      return new Promise((resolve) => setTimeout(() => resolve({
        seo: { title: "Сгенерированная страница", description: "Моковое SEO описание для песочницы" },
        blocks: [
          {
            id: 'mock-hero',
            type: 'HeroWidget',
            content: { title: "Новая услуга клиники", subtitle: params.prompt }
          },
          {
            id: 'mock-features',
            type: 'FeaturesWidget',
            content: { 
              title: "Преимущества нашего предложения", 
              items: [
                { title: "Современное оборудование", text: "Мы используем лучшие технологии." },
                { title: "Опытные врачи", text: "Специалисты с большим стажем работы." }
              ] 
            }
          },
          {
            id: 'mock-doctors',
            type: 'DoctorsWidget',
            content: { title: "Наши специалисты", subtitle: "Выберите врача для записи" }
          }
        ]
      }), 1500));
    }
  }
};

async function mockGenerate(params: GenerationParams): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`{"title": "Сгенерированный заголовок", "description": "Сгенерированное SEO описание на базе ваших мыслей. Мы учли инструкцию: ${params.instruction}", "content": "Это большой сгенерированный текст. В боевом режиме здесь будет ответ от DeepSeek V3/R1. Длина настроена от ${params.minLength} до ${params.maxLength} символов. Текст из запроса: ${params.prompt}"}`);
    }, 1500);
  });
}
