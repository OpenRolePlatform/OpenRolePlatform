import { CharacterModel } from "../../../core/schemas/character/main-character-schema";

export async function _getCharacter(character: string) {
  return await CharacterModel.findOne({
    name: character,
  });
}
