import characterSkills from "../../core/schemas/characterSkills-schema";

export async function _getSkillsStats(character: string) {
  return await characterSkills.findOne({
    character: character,
  });
}
