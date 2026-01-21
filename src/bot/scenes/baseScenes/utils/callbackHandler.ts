import type { MyContext } from "../../../types.js";

export const callbackHandler = async (callback: string, ctx: MyContext) => {
    if (callback.includes('ask_question')) {
        ctx.scene.enter('aiChatScene')
    } else if (callback.includes('contact')) {
        ctx.scene.enter('contactScene')
    } else if (callback.includes('go_back')) {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
        return ctx.scene.enter('mainScene'); // П
    }
}