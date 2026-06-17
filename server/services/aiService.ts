import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from "openai";

// Инициализация клиентов
let geminiClient: GoogleGenAI | null = null;
let openRouterClient: OpenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

export function getOpenRouterClient(): OpenAI {
  if (!openRouterClient) {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
      throw new Error("OPENROUTER_API_KEY environment variable is missing");
    }
    openRouterClient = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: key,
      defaultHeaders: {
        "HTTP-Referer": process.env.VERCEL_URL || "http://localhost:3000",
        "X-Title": "Medical Booking Applet",
      }
    });
  }
  return openRouterClient;
}

export interface GenerationParams {
  prompt: string;
  minLength?: number;
  maxLength?: number;
  instruction?: string;
  systemPrompt?: string;
}

export async function generateText(params: GenerationParams): Promise<string> {
  const { prompt, minLength, maxLength, instruction, systemPrompt } = params;

  let finalSystemPrompt = systemPrompt || instruction || "Ты — профессиональный AI ассистент.";
  if (minLength) {
    finalSystemPrompt += ` Минимальная длина ответа: ${minLength} символов.`;
  }
  if (maxLength) {
    finalSystemPrompt += ` Максимальная длина ответа: ${maxLength} символов.`;
  }

  // Попробуем OpenRouter сначала, если задан ключ и модель, иначе фоллбэк на Gemini
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const client = getOpenRouterClient();
      const model = process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat"; 
      const response = await client.chat.completions.create({
        model,
        messages: [
          { role: "system", content: finalSystemPrompt },
          { role: "user", content: prompt }
        ],
      });
      return response.choices[0]?.message?.content || "";
    } catch (e) {
      console.error("OpenRouter generation failed (Text), falling back to Gemini:", e);
    }
  }

  // Fallback to Gemini
  const client = getGeminiClient();
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: finalSystemPrompt
    }
  });
  return response.text || "";
}

export async function generateLayoutBlocks(params: GenerationParams): Promise<any> {
    const { prompt, instruction, systemPrompt } = params;
    const finalSystemPrompt = systemPrompt || instruction || "Ты AI-архитектор. Верни только корректный JSON объект.";

    const systemPromptStructure = `
${finalSystemPrompt}
Сгенерируй структуру страницы. Ответ должен быть только в формате JSON.
Формат результата:
{
  "seo": { "title": "Название", "description": "Описание страницы" },
  "blocks": [
    {
      "id": "hero-section",
      "type": "HeroWidget",
      "content": { "title": "...", "subtitle": "..." }
    }
  ]
}
Доступные виджеты: HeroWidget, FeaturesWidget, DoctorsWidget, PromotionsWidget, TextWidget. Обязательно наполни их релевантным текстом из запроса. Возвращай только JSON.
`;

  // Попробуем OpenRouter
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const client = getOpenRouterClient();
      const model = process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat"; 
      const response = await client.chat.completions.create({
        model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPromptStructure },
          { role: "user", content: prompt }
        ],
      });
      const text = response.choices[0]?.message?.content || "{}";
      return JSON.parse(text);
    } catch (e) {
      console.error("OpenRouter generation failed (Layout), falling back to Gemini:", e);
    }
  }

  // Gemini Fallback
  const client = getGeminiClient();
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: systemPromptStructure,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          seo: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
            }
          },
          blocks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                content: {
                  type: Type.OBJECT,
                  description: "Содержимое виджета",
                  properties: {
                    title: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    text: { type: Type.STRING },
                    items: {
                       type: Type.ARRAY,
                       items: {
                          type: Type.OBJECT,
                          properties: {
                             title: { type: Type.STRING },
                             text: { type: Type.STRING }
                          }
                       }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
