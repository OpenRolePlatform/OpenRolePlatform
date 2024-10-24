import { Skills } from "../../../core/models/skills";
import characterSkills from "../../../core/schemas/character/characterSkills-schema";

export async function _putCharacterSkillsStats(
  character: string,
  skills: Skills
) {
  await characterSkills.findOneAndUpdate(
    {
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
