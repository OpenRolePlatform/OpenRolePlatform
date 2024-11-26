import { ConnectionsManager } from "../../../connectDB";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");

/**
 * delete one character by id
 * @param id id of the character to delete
 */
export async function _deleteCharacter(id: string) {
  return await CharacterModel().findByIdAndDelete(id);
}
