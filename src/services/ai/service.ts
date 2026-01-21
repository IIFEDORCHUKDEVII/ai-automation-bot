// src/services/ai/service.ts
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from './prompt.js'; // Важливо: .js розширення для ESM

// Ініціалізація клієнта
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // Новий ключ
  baseURL: 'https://api.groq.com/openai/v1', // <--- ВАЖЛИВО: вказуємо адресу Groq
});

export async function getAIResponse(userMessage: string): Promise<string> {
  try {
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o", // Або gpt-3.5-turbo для економії
    //   messages: [
    //     { role: "system", content: SYSTEM_PROMPT },
    //     { role: "user", content: userMessage },
    //   ],
    //   temperature: 0.7, // Креативність (0.7 - збалансовано)
    // });
    const now = new Date();
    const dayName = now.toLocaleDateString('uk-UA', { weekday: 'long' }).toLowerCase();
    const isWeekend = dayName === 'субота' || dayName === 'неділя';

    const dynamicContext = `
    ---
    АКТУАЛЬНА ІНФОРМАЦІЯ:
    Сьогодні: ${dayName} (${now.toLocaleDateString()}). 
    Час: ${now.toLocaleTimeString()}.
    Статус дня: ${isWeekend ? 'ВИХІДНИЙ (PlayStation тільки з кальяном!)' : 'БУДНІЙ (PlayStation доступна окремо)'}.
    ---
    `;
    const completion = await openai.chat.completions.create({
      // Використовуємо Llama 3 (вона крута і безкоштовна на Groq)
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT + dynamicContext
        },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    })
    return completion.choices[0]?.message?.content || "Щось я туплю, давай ще раз.";
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "Вибач, бро, у мене технічна перерва. Спробуй пізніше.";
  }
}