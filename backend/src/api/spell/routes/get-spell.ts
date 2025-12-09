import { prisma } from "../../../connectDB";
import { SpellAdapter } from "../../../core/adapters/spell-adapter";

export const _getSpell = async (characterID: string, spellName: string) => {
  if (!spellName) return null;

  const entry = await prisma.spellbookEntry.findFirst({
    where: {
      characterId: characterID,
      spell: {
        name: { equals: spellName, mode: 'insensitive' }
      }
    },
    include: {
      spell: true
    }
  });

  if (!entry) return null;

  const adapted = SpellAdapter.toFrontend(entry.spell);
  return { ...adapted, prepared: entry.prepared };
};
