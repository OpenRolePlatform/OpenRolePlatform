import { Skills } from "../../../core/models/skills-model";
import characterSkills from "../../../core/schemas/character/characterSkills-schema";

export async function _putCharacterSkillsStats(
  campaign: string,
  character: string,
  skills: Skills
) {
  await characterSkills.findOneAndUpdate(
    {
      campaign: campaign,
      character: character,
    },
    {
      ...skills,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
