import { prisma } from "../../../connectDB";
import { CharacterAdapter } from "../../../core/adapters/character-adapter";

export const _getCharactersOwner = async (ownerId: string) => {
  const characters = await prisma.character.findMany({
    where: { playerId: ownerId }, // Filtramos por la Foreign Key
    include: {
      inventory: { include: { item: true } },
      spellbook: { include: { spell: true } }
    }
  });

  return characters.map(char => CharacterAdapter.toFrontend(char));
};
