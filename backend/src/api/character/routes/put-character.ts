import { ConnectionsManager } from "../../../connectDB";
import { Character } from "../../../core/models/character/character-model";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");

/**
 * Update one character
 * @param id id of the character to update
 * @param character new data of the character
 * @returns the updated character data
 */
export async function _putCharacter(id: string, updateCharacter: Character) {
  let character = await CharacterModel().findByIdAndUpdate(
    id,
    {
      $set: { ...updateCharacter },
    },
    { new: true }
  );
  return character;
}
