import characterSkills from "../../../core/schemas/character/characterSkills-schema";

export async function _getCharacterSkillsStats(
  campaign: string,
  character: string
) {
  return await characterSkills.findOne({
    campaign: campaign,
    character: character,
  });
}
