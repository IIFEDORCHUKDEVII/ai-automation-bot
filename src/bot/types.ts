import { Context, Scenes } from 'telegraf';

// 1. Описуємо дані, які живуть ВСЕРЕДИНІ сцени (Wizard)
// Сюди кладемо те, що збираємо покроково
interface MyWizardSession extends Scenes.WizardSessionData {
    booking?: {
        time?: string;
        phone?: string;
        name?: string;
    };
}

// 2. Описуємо ГЛОБАЛЬНУ сесію
// Важливо: вона розширює Scenes.SceneSession, щоб Telegraf мав своє службове поле __scenes
interface MySession extends Scenes.SceneSession<MyWizardSession> {
    // Ваші глобальні поля
    chosenAction?: 'booking' | 'ask_question';
    prevScene?: string;
}

// 3. Розширюємо основний тип Context
export interface MyContext extends Context {
    // Тепер session має правильну структуру з __scenes
    session: MySession;

    // Вказуємо, що сцена використовує саме нашу MyWizardSession
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;

    // Додаємо типізацію для ctx.wizard (обов'язково для Wizard-сцен)
    wizard: Scenes.WizardContextWizard<MyContext>;
}