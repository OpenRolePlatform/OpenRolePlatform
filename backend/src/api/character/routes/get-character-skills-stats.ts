import characterSkills from "../../../core/schemas/character/characterSkills-schema";

export async function _getCharacterSkillsStats(character: string) {
  return await characterSkills.findOne({
    character: character,
  });
}
