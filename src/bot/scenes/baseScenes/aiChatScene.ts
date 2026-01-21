import { Scenes, Markup } from 'telegraf';
import { getAIResponse } from '../../../services/ai/service.js';
import type { MyContext } from '../../types.js';

export const aiChatScene = new Scenes.BaseScene<MyContext>('aiChatScene');

// 1. Вхід у сцену: Кнопка тепер INLINE
aiChatScene.enter(async (ctx) => {
    await ctx.editMessageText(
        'Привіт! Я Ксюша. Птай про все, що цікавить: кальяни, ігри, життя. 💨',
        Markup.inlineKeyboard([
            [Markup.button.callback('⬅️ Назад в меню', 'go_back')]
        ])
    );
});

// 2. Обробка натискання на Inline-кнопку
// Важливо: ми використовуємо .action(), а не .hears()
aiChatScene.action('go_back', async (ctx) => {
    // Обов'язково відповідаємо телеграму, що кнопка натиснута (щоб не крутився годинник)
    await ctx.answerCbQuery();

    // (Опціонально) Видаляємо повідомлення з кнопкою, щоб не засмічувати чат
    await ctx.deleteMessage().catch(() => { });

    // await ctx.reply('Окей, повертаємось на базу. 🫡');
    return ctx.scene.enter('mainScene'); // Переконайся, що назва твоєї головної сцени правильна
});

// 3. Обробка тексту (спілкування з AI)
aiChatScene.on('text', async (ctx) => {
    try {
        await ctx.sendChatAction('typing');
        const userText = ctx.message.text;

        const aiAnswer = await getAIResponse(userText);

        // Маленький лайфхак для Inline:
        // Можна додавати кнопку "Назад" до КОЖНОЇ відповіді AI,
        // щоб юзеру не треба було гортати вгору, якщо діалог довгий.
        await ctx.reply(aiAnswer, {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('⬅️ Вийти', 'go_back')]
            ])
        });

    } catch (error) {
        console.error('AI Error:', error);
        await ctx.reply('Щось пішло не так. Спробуй ще раз.');
    }
});