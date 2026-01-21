import { Markup, Scenes } from "telegraf";
import type { MyContext } from "../../types.js";
import { callbackHandler } from "./utils/callbackHandler.js";

const contactScene = new Scenes.BaseScene<MyContext>('contactScene');

contactScene.enter(async (ctx) => {
    await ctx.editMessageText('Маєш питання? Набери нас прямо зараз! 📞');
    await ctx.replyWithContact('+380991234567', 'Кальянна (Адмін Ксюша)'); await ctx.reply('Або повертайся в меню:',
        Markup.inlineKeyboard([
            [Markup.button.callback('⬅️ Назад в меню', 'go_back')]
        ])
    );
});
contactScene.action('go_back', async (ctx) => {
    await ctx.answerCbQuery(); // Зупиняє "годинничок"
    await ctx.deleteMessage(); // (Опціонально) Прибирає повідомлення з кнопками
    return ctx.scene.enter('mainScene'); // Повертає в меню
});
contactScene.action(/.*/, async ctx => {
    const callback: string = ctx.match?.[0]
    console.log(callback);

    callbackHandler(callback, ctx)
})
export default contactScene;