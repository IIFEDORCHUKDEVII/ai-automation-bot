// src/utils/navigation.ts
import type { MyContext } from '../bot/types.ts';

/**
 * Перехід у нову сцену зі збереженням "хлібної крихти" (звідки прийшли)
 */
export async function changeScene(ctx: MyContext, sceneId: string) {
    // Якщо ми зараз у якійсь сцені — запам'ятовуємо її ID
    if (ctx.scene.current) {
        ctx.session.prevScene = ctx.scene.current.id;
    }
    
    // Переходимо далі
    return ctx.scene.enter(sceneId);
}