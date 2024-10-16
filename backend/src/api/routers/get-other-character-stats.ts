import otherCharacterStats from "../../core/schemas/otherCharacterStats-schema";

export async function _getOtherCharacterStats(character: string) {
  return await otherCharacterStats.findOne({
    character: character,
  });
}
