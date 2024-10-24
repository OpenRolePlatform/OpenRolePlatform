import characterStats from "../../../core/schemas/character/characterStats-schema";

export async function _getCharacterStats(campaign: string, character: string) {
  return await characterStats.findOne({
    campaign: campaign,
    character: character,
  });
}
