import { ConnectionsManager } from "../../connectDB";
import { Character } from "../../core/models/character/character-model";
import { normalizeString } from "../../stringNormalizer";

const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");

/**
 * Get all characters of an owner
 * @param owner owner of the characters
 * @returns characters of the owner
 */
export async function getAllCharactersOwner(owner: string) {
  return await CharacterModel().find({
    owner: owner,
  });
}

/**
 * Get all characters
 * @returns all characters in the campaign
 */
export async function getAllCharacters() {
  return await CharacterModel().find();
}

/**
 * Get the character details
 * @param id id of the character
 * @returns return all the character struct
 */
export async function getCharacterDetails(id: string) {
  return await CharacterModel().findById(id);
}

/**
 * Create one character
 * @param character Character object to create
 * @returns the created character object
 */
export async function createCharacter(character: Character) {
  let id = normalizeString(character.name);

  const matchingId = await CharacterModel().findById(id);
  const matchingNames = await CharacterModel().find({ name: character.name });
  if (matchingNames.length > 0 || matchingId) return;
  return await CharacterModel().create({
    _id: id,
    ...character,
  });
}

/**
 * Update one character
 * @param id id of the character to update
 * @param character new data of the character
 * @returns the updated character data
 */
export async function updateCharacter(id: string, updateCharacter: Character) {
  let character = await CharacterModel().findByIdAndUpdate(id, {
    $set: { ...updateCharacter },
  });
  return character;
}

/**
 * delete one character by id
 * @param id id of the character to delete
 */
export async function deleteCharacter(id: string) {
  return await CharacterModel().findByIdAndDelete(id);
}
