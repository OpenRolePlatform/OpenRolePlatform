export interface Item {
  id: string; // Identificador único del ítem
  name: string; // Nombre del ítem
  description: string; // Descripción del ítem
  type: 'weapon' | 'armor' | 'potion' | 'accessory' | 'misc'; // Tipo de ítem
  stats?: Stats; // Stats adicionales que puede otorgar
  equipped?: boolean; // Indica si el ítem está equipado
}

export interface Inventory {
  id: string; // Identificador único del inventario
  characterId: string; // ID del personaje al que pertenece el inventario
  items: Item[]; // Lista de ítems en el inventario
  equippedItems: Item[]; // Lista de ítems equipados
}
