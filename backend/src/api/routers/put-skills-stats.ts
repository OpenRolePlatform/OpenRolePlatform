import { Skills } from "../../core/models/skills";
import characterSkills from "../../core/schemas/characterSkills-schema";

export async function _putSkillsStats(character: string, skills: Skills) {
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
