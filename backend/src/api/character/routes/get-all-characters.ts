import { prisma } from "../../../connectDB";
import { CharacterAdapter } from "../../../core/adapters/character-adapter";

export const _getAllCharacters = async () => {
  try {
    const characters = await prisma.character.findMany({
      include: {
        inventory: { include: { item: true } },
        spellbook: { include: { spell: true } }
      }
    });

    return characters.map(char => CharacterAdapter.toFrontend(char));
  } catch (error) {
    console.error("Error in _getAllCharacters:", error);
    throw error;
  }
};
