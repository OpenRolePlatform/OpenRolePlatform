import CharacterSchema from "../../../core/schemas/character/character-schema";

export async function _getAllCharacter(owner: string) {
  return await CharacterSchema.find({
    owner: owner,
  });
}
