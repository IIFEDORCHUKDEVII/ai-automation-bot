// src/services/ai/service.ts
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from './prompt.js'; // Важливо: .js розширення для ESM

// Ініціалізація клієнта
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Або gpt-3.5-turbo для економії
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7, // Креативність (0.7 - збалансовано)
    });

    return completion.choices[0]?.message?.content || "Щось я туплю, давай ще раз.";
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "Вибач, бро, у мене технічна перерва. Спробуй пізніше.";
  }
}