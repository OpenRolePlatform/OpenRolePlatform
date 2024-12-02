export interface Damage {
  damage_dice_quantity: number;
  damage_dice_sides: number;
  damage_addition: number;
  damage_type: string;
}

export interface Item {
  _id?: string; // Identificador único del ítem
  name: string; // Nombre del ítem
  description: string; // Descripción del ítem
  type: 'weapon' | 'armor' | 'potion' | 'accessory' | 'misc'; // Tipo de ítem
  equipable?: boolean;
  bonus?: number;
  damage: Damage;
  image?: string;
}

export interface ItemInstance {
  owner: string;
  equipped: string;
  item: Item;
  amount: number;
  hidden: boolean;
}
export interface Inventory {
  id: string; // Identificador único del inventario
  characterId: string; // ID del personaje al que pertenece el inventario
  items: Item[]; // Lista de ítems en el inventario
  equippedItems: Item[]; // Lista de ítems equipados
}
