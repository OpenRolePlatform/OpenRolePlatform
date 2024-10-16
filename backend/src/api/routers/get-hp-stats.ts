import hpStats from "../../core/schemas/hpStats-schema";

export async function _getHpStats(character: string) {
  return await hpStats.findOne({
    character: character,
  });
}
