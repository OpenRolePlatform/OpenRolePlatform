import { Schema } from "mongoose";
import { campaignDB } from "../../connectCampaign";

const reqNumber = {
  type: Number,
  required: true,
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

const characterStats = new Schema({
  campaign: reqCampaign,
  character: reqCharacter,
  strength: reqNumber,
  dexterity: reqNumber,
  constitution: reqNumber,
  intelligence: reqNumber,
  wisdom: reqNumber,
  charisma: reqNumber,
});

export default campaignDB.model("characterStats", characterStats);
