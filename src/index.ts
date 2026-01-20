// src/index.ts
import { Telegraf } from 'telegraf';
import { getAIResponse } from './services/ai/service.js';
import "dotenv/config"; // Завантажуємо змінні оточення

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is missing!");

const bot = new Telegraf(token);

// Логування запуску
bot.launch().then(() => {
    console.log('🚀 Макс (Бот) вийшов на зміну!');
});

// Обробка текстових повідомлень
bot.on('text', async (ctx) => {
    // Показуємо статус "друкує...", поки AI думає
    await ctx.sendChatAction('typing');

    const userText = ctx.message.text;
    
    // Отримуємо відповідь від AI
    const aiReply = await getAIResponse(userText);
    
    // Відправляємо відповідь
    await ctx.reply(aiReply);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));