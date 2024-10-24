import characterStats from "../../../core/schemas/characterStats-schema";

export async function _getCharacterStats(character: string) {
  return await characterStats.findOne({
    character: character,
  });
}
