// src/index.ts
import { session, Telegraf } from 'telegraf';
import "dotenv/config"; // Завантажуємо змінні оточення

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is missing!");

import type { MyContext } from './bot/types.js'; // імпортуємо власний тип Context
import { stage } from './bot/index.js';

const bot = new Telegraf<MyContext>(token);
bot.use(session());          // Спочатку сесія
bot.use(stage.middleware()); // Потім сцени
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
    ctx.scene.enter('mainScene')
    // const aiReply = await getAIResponse(userText);

    // Відправляємо відповідь
    // await ctx.reply(aiReply);

});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));