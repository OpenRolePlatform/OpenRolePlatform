import { ConnectionsManager } from "../../../connectDB";
import { Character } from "../../../core/models/character/character-model";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");
/**
 * Get all characters
 * @returns all characters in the campaign
 */
export async function _getCharacters(query: Character) {
  return await CharacterModel().find(query);
}
