import characterOtherStats from "../../../core/schemas/character/characterOtherStats-schema";

export async function _getCharacterOtherStats(character: string) {
  return await characterOtherStats.findOne({
    character: character,
  });
}
