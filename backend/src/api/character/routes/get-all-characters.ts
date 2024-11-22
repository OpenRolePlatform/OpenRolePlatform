import CharacterSchema from "../../../core/schemas/character/character-schema";

export async function _getAllCharactersOwner(owner: string) {
  return await CharacterSchema.find({
    owner: owner,
  });
}

export async function _getAllCharacters() {
  return await CharacterSchema.find();
}
