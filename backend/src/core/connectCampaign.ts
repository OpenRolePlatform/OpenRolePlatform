import "dotenv/config";
import mongoose from "mongoose";

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

mongoose.set("strictQuery", true);

export const campaignDB = mongoose.createConnection(
  `mongodb://${dbHost}:${dbPort}/MyCampain`
);

// Check DB Connection
campaignDB.once("open", () => {
  console.log(`Database connection successfully to MyCampain`);
});

/* export const CharacterModel = campaignDB.model(
  "CharacterSchema",
  CharacterSchema
);
export const CharacterHpModel = campaignDB.model("hpStats", hpStats);
export const CharacterOtherModel = campaignDB.model(
  "characterOtherStats",
  characterOtherStats
);
export const CharacterSkillsModel = campaignDB.model(
  "characterSkills",
  characterSkills
);
export const CharacterStatsModel = campaignDB.model(
  "characterStats",
  characterStats
); */
