import otherCharacterStats from "../../../core/schemas/character/characterOtherStats-schema";

export async function _getCharacterOtherStats(character: string) {
  return await otherCharacterStats.findOne({
    character: character,
  });
}
