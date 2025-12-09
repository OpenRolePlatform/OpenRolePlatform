import { prisma } from "../../../connectDB";
import { CharacterAdapter } from "../../../core/adapters/character-adapter";

export const _getCharacter = async (id: string) => {
  const character = await prisma.character.findUnique({
    where: { id },
    include: {
      inventory: { include: { item: true } },
      spellbook: { include: { spell: true } }
    }
  });

  if (!character) return null;
  return CharacterAdapter.toFrontend(character);
};
