import { ConnectionsManager } from "../../../connectDB";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");

/**
 * Get all characters of an owner
 * @param owner owner of the characters
 * @returns characters of the owner
 */
export async function _getCharactersOwner(owner: string) {
  return await CharacterModel().find({
    owner: owner,
  });
}
