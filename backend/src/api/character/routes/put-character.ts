import { Character } from "../../../core/models/character/character-model";
import { CharacterModel } from "../../../core/schemas/character/character-schema";

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
