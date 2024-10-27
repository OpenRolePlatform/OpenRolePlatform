import { Schema } from "mongoose";
import { campaignDB } from "../../connectCampaign";

const reqStat = {
  type: Schema.Types.ObjectId,
  ref: "characterStats",
  required: false,
};

const reqSkills = {
  type: Schema.Types.ObjectId,
  ref: "characterSkills",
  required: false,
};

const reqHp = {
  type: Schema.Types.ObjectId,
  ref: "hpStats",
  required: false,
};

const reqOther = {
  type: Schema.Types.ObjectId,
  ref: "otherCharacterStats",
  required: false,
};

const reqCampaign = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

const reqCharacter = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

const CharacterSchema = new Schema({
  campaign: reqCampaign,
  name: reqCharacter,
  stats: reqStat,
  skills: reqSkills,
  hp: reqHp,
  other: reqOther,
});

export default campaignDB.model("CharacterSchema", CharacterSchema);
