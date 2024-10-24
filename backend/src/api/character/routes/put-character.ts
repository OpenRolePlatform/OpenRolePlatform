import { Character } from "../../../core/models/CharacterModels";
import { CharacterModel } from "../../../core/schemas/character/main-character-schema";

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
