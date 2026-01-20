
// Опис одного товару на складі
interface InventoryItem {
    name: string;
    quantity: number; // Скільки зараз є
    unit: string;     // 'г' або 'шт'
}

// Опис рецепту (скільки витрачається на 1 замовлення)
interface Recipe {
    tobacco: number; // грами
    coals: number;   // штуки
}

 

export let inventory: Record<string, InventoryItem> = {
    tobacco_mix: { name: "Тютюн (Основний мікс)", quantity: 5000, unit: "г" },
    coals:       { name: "Вугілля (Cocobrico)",   quantity: 1000, unit: "шт" }
};

 


// Твої техкарти (Рецепти)
// 'const', бо рецепти не змінюються під час роботи
const RECIPES: Record<string, Recipe> = {
    "hookah_medium": { tobacco: 20, coals: 3 }, // Середній
    "hookah_strong": { tobacco: 20, coals: 3 }, // Міцний
    "hookah_special":{ tobacco: 25, coals: 4 }  // Фірмовий
};