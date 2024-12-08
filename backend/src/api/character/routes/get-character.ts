import { ConnectionsManager } from "../../../connectDB";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");

/**
 * Get the character details
 * @param id id of the character
 * @returns return all the character struct
 */
export async function _getCharacter(id: string) {
  return await CharacterModel().findById(id);
}
