import { ConnectionsManager } from "../../../connectDB";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");
/**
 * Get all characters
 * @returns all characters in the campaign
 */
export async function _getCharacters() {
  return await CharacterModel().find();
}
