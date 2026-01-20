export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'hookah' | 'food' | 'drink';
}

export interface IPosterService {
    getMenu(): Promise<Product[]>;
    checkStock(itemId: string): Promise<number>; // повертає кількість (кг або шт)
}