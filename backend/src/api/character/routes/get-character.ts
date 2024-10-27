import CharacterSchema from "../../../core/schemas/character/character-schema";

export async function _getCharacter(campaign: string, character: string) {
  return await CharacterSchema.findOne({
    campaign: campaign,
    name: character,
  });
}
