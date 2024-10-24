import { model, Schema } from "mongoose";
import characterHpStatsSchema from "./characterHpStats-schema";
import otherCharacterStatsSchema from "./characterOtherStats-schema";
import characterSkillsSchema from "./characterSkills-schema";
import characterStatsSchema from "./characterStats-schema";

const characterSchema = new Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  stats: characterStatsSchema,
  skills: characterSkillsSchema,
  hp: characterHpStatsSchema,
  other: otherCharacterStatsSchema,
});

export const CharacterModel = model("Character", characterSchema);
