import { Scenes } from "telegraf";
import type { MyContext } from "../../types.js";
import { mainMenuKeyboard } from "../../keyboards/index.js";
import { callbackHandler } from "./utils/callbackHandler.js"; 

const mainScene = new Scenes.BaseScene<MyContext>('mainScene');

mainScene.enter(async (ctx) => {
    await ctx.reply('👋 Вітаю в головному меню!', mainMenuKeyboard);
});

mainScene.action(/.*/, async ctx => {
    const callback: string = ctx.match?.[0]
    console.log(callback);

    await callbackHandler(callback, ctx)
})
export default mainScene;