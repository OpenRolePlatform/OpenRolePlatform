import { prisma } from "../../../connectDB";
import { CharacterAdapter } from "../../../core/adapters/character-adapter";
import { CharacterInputSchema } from "../../../core/validation/zod-schemas";

export const _postCharacter = async (data: any) => {

  const parseIfString = (val: any) => {
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch (e) { return val; }
    }
    return val;
  };

  data.stats = parseIfString(data.stats);
  data.hp = parseIfString(data.hp);
  data.other = parseIfString(data.other);
  data.savingThrows = parseIfString(data.savingThrows);
  data.skills = parseIfString(data.skills);
  data.inventory = parseIfString(data.inventory);

  if (!data.stats) {
    data.stats = { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 };
  }
  if (!data.hp) {
    data.hp = { current: 10, max: 10, temp: 0 };
  }
  if (!data.other) {
    data.other = { proficiencyBonus: 2, speed: 30, initiative: 0, armorClass: 10 };
  }
  if (!data.savingThrows) data.savingThrows = {};
  if (!data.skills) data.skills = {};
  if (!data.spells) data.spells = [];
  if (!data.inventory) data.inventory = [];

  if (!data.owner) data.owner = "dm";
  const validatedData = CharacterInputSchema.parse(data);

  const { meta, sheet } = CharacterAdapter.toDatabase(validatedData);

  const newChar = await prisma.character.create({
    data: {
      ...meta,
      sheetData: sheet,
      player: { connect: { id: validatedData.owner } }
    },
    include: {
      inventory: { include: { item: true } },
      spellbook: { include: { spell: true } }
    }
  });

  return CharacterAdapter.toFrontend(newChar);
};
