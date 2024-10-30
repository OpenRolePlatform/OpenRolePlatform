import CharacterSchema from "../../../core/schemas/character/character-schema";

export async function _getCharacter(character: string) {
  return await CharacterSchema.findOne({
    name: character,
  });
}
