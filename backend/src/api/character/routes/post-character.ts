import { ConnectionsManager } from "../../../connectDB";
import { Character } from "../../../core/models/character/character-model";
import { normalizeString } from "../../../stringNormalizer";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");

/**
 * Create one character
 * @param character Character object to create
 * @returns the created character object
 */
export async function _postCharacter(character: Character) {
  let id = normalizeString(character.name);

  const matchingId = await CharacterModel().findById(id);
  const matchingNames = await CharacterModel().find({ name: character.name });
  if (matchingNames.length > 0 || matchingId) return;
  return await CharacterModel().create({
    _id: id,
    ...character,
  });
}
