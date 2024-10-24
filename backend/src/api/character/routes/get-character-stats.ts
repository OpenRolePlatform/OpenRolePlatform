import characterStats from "../../../core/schemas/character/characterStats-schema";

export async function _getCharacterStats(character: string) {
  return await characterStats.findOne({
    character: character,
  });
}
