import characterOtherStats from "../../../core/schemas/character/characterOtherStats-schema";

export async function _getCharacterOtherStats(
  campaign: string,
  character: string
) {
  return await characterOtherStats.findOne({
    campaign: campaign,
    character: character,
  });
}
