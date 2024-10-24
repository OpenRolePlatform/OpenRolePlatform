import { Character } from "../../../core/models/CharacterModels";
import { CharacterModel } from "../../../core/schemas/CharacterSchemas";

export async function _getCharacter(character: string) {
  return await CharacterModel.findOne({
    name: character,
  });
}

export async function _putCharacter(character: string, data: Character) {
  await CharacterModel.findOneAndUpdate(
    {
      name: character,
    },
    {
      ...data,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
