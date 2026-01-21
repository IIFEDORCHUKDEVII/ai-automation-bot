import { Markup } from "telegraf";

export const mainMenuKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('🕒 Забронювати столик', 'booking')],
    [Markup.button.callback('❓ Задати питання', 'ask_question')],
    [Markup.button.callback('📞 Контакти', 'contact')],
],);

export const contactKeyboard = Markup.inlineKeyboard([
    [ // Початок першого рядка
        Markup.button.url('📞 Подзвонити', 'tel:+380991234567'),
        Markup.button.callback('⬅️ Назад', 'go_back')
    ] // Кінець першого рядка
])