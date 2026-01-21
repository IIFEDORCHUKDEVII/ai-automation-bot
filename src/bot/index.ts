import { Scenes } from 'telegraf';
import type { MyContext } from './types.js';
import mainScene from './scenes/baseScenes/mainScene.js';
import { aiChatScene } from './scenes/baseScenes/aiChatScene.js';
import contactScene from './scenes/baseScenes/contactScene..js';
// 1. Тут ми будемо імпортувати всі наші сцени
// Поки що закоментовано, бо файлу order.ts ще фізично немає
// import { orderScene } from './order'; 

// 2. Створюємо Сцену (Stage)
// Сюди ми передаємо масив усіх можливих сценаріїв
export const stage = new Scenes.Stage<MyContext>([
    mainScene, aiChatScene, contactScene
]);