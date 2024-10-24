import hpStats from "../../../core/schemas/character/characterHpStats-schema";

export async function _getCharacterHpStats(character: string) {
  return await hpStats.findOne({
    character: character,
  });
}
