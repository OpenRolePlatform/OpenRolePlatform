import hpStats from "../../../core/schemas/character/characterHpStats-schema";

export async function _getCharacterHpStats(
  campaign: string,
  character: string
) {
  return await hpStats.findOne({
    campaign: campaign,
    character: character,
  });
}
