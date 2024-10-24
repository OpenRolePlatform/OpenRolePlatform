import { Character } from "../../../core/models/character/character-model";
import CharacterSchema from "../../../core/schemas/character/character-schema";

export async function _putCharacter(character: string, data: Character) {
  await CharacterSchema.findOneAndUpdate(
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
