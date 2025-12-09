import { prisma } from "../../../connectDB";
import { CharacterAdapter } from "../../../core/adapters/character-adapter";
import { Prisma } from "@prisma/client";

export const _getCharacters = async (query: any) => {
  try {
    const whereClause: Prisma.CharacterWhereInput = {};

    /* Filter by name */
    if (query.name) {
      whereClause.name = {
        contains: String(query.name),
        mode: 'insensitive'
      };
    }

    /* Filter by class */
    if (query.class) {
      whereClause.class = {
        contains: String(query.class),
        mode: 'insensitive'
      };
    }

    /* Filter by level */
    if (query.level) {
      whereClause.level = Number(query.level);
    }

    /* Filter by Owner (player) */
    if (query.owner) {
      whereClause.playerId = String(query.owner);
    }

    const characters = await prisma.character.findMany({
      where: whereClause,
      include: {
        inventory: { include: { item: true } },
        spellbook: { include: { spell: true } }
      }
    });

    return characters.map(char => CharacterAdapter.toFrontend(char));
  } catch (error) {
    console.error("Error in _getCharacters:", error);
    throw error;
  }
};
