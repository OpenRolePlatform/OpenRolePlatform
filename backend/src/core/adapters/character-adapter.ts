import { Character, InventoryItem, Item, SpellbookEntry, Spell } from '@prisma/client';
import { CharacterInput } from '../validation/zod-schemas';

type CharacterWithRelations = Character & {
  inventory: (InventoryItem & { item: Item })[];
  spellbook: (SpellbookEntry & { spell: Spell })[];
};

export const CharacterAdapter = {
  toFrontend: (char: CharacterWithRelations) => {
    // Cast JSONB payload to typed interface
    const sheet = char.sheetData as unknown as CharacterInput;

    return {
      _id: char.id, // Map SQL ID to Mongo-style ID
      owner: char.playerId,
      name: char.name,
      image: char.image || "",
      class: char.class || "",
      level: char.level,
      creation_date: char.creationDate,

      // Spread JSONB data to root level
      race: sheet.race,
      stats: sheet.stats,
      skills: sheet.skills,
      hp: sheet.hp,
      other: sheet.other,

      items: char.inventory.map(inv => {
        const systemData = inv.item.systemData as any;
        return {
          _id: inv.itemId,      // Template ID (Frontend expects this as the item ID)
          instanceId: inv.id,   // Unique Instance ID (Useful for specific operations)
          name: inv.item.name,
          description: inv.item.description,
          type: inv.item.type,
          image: inv.item.image,
          equipped: inv.equipped,
          amount: inv.amount,
          ...systemData,        // Spread technical stats (damage, bonus, etc.)
        };
      }),

      spells: char.spellbook.map(entry => {
        const spellData = entry.spell.systemData as any;
        return {
          _id: entry.spellId,
          name: entry.spell.name,
          level: entry.spell.level,
          class: entry.spell.class,
          school: entry.spell.school,
          prepared: entry.prepared,
          description: entry.spell.description,
          ...spellData
        };
      })
    };
  },

  toDatabase: (input: any) => {
    const {
      name, image, race, level, class: className, // SQL Columns
      stats, skills, hp, other,                   // JSONB Data
      items, spells,                              // Relations to manage
      _id, owner, creation_date, ...rest          // Excluded or managed separately
    } = input;

    const prismaPayload: any = {
      meta: {
        name,
        image,
        level: Number(level) || 0,
        class: className
      },
      sheet: {
        race,
        stats,
        skills,
        hp,
        other,
        ...rest
      }
    };

    if (items && Array.isArray(items)) {
      prismaPayload.inventoryRelations = {
        deleteMany: {}, // Clears current inventory for this character
        create: items.map((item: any) => ({
          item: { connect: { id: item._id } },
          amount: Number(item.amount) || 1,
          equipped: Boolean(item.equipped) || false,
        }))
      };
    }

    if (spells && Array.isArray(spells)) {
      prismaPayload.spellbookRelations = {
        deleteMany: {},
        create: spells.map((spell: any) => ({
          spell: { connect: { id: spell._id } },
          prepared: Boolean(spell.prepared) || false
        }))
      };
    }

    return prismaPayload;
  }
};;
