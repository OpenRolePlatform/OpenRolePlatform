import { prisma } from "../../../connectDB";
import { SpellAdapter } from "../../../core/adapters/spell-adapter";
import { Prisma } from "@prisma/client";

export const _getAllSpells = async (characterID: string, query: any, isDB: boolean) => {

  const spellFilter: Prisma.SpellWhereInput = {};

  if (query.name) spellFilter.name = { contains: String(query.name), mode: 'insensitive' };
  if (query.level !== undefined && query.level !== "") spellFilter.level = Number(query.level);
  if (query.class) spellFilter.class = { contains: String(query.class), mode: 'insensitive' };
  if (query.school) spellFilter.school = { contains: String(query.school), mode: 'insensitive' };

  if (isDB) {
    const spells = await prisma.spell.findMany({
      where: spellFilter,
      orderBy: { level: 'asc' }
    });
    return spells.map(SpellAdapter.toFrontend);
  }

  else {
    const entries = await prisma.spellbookEntry.findMany({
      where: {
        characterId: characterID,
        spell: spellFilter
      },
      include: {
        spell: true
      },
      orderBy: {
        spell: { level: 'asc' }
      }
    });

    return entries.map(entry => {
      const baseSpell = SpellAdapter.toFrontend(entry.spell);

      return {
        ...baseSpell,
        prepared: entry.prepared,
      };
    });
  }
};
