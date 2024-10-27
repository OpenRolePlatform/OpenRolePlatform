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

const characterOtherStats = new Schema({
  campaign: reqCampaign,
  character: reqCharacter,
  ac: reqNumber,
  movement: reqNumber,
  bonus: reqNumber,
});

export default campaignDB.model("characterOtherStats", characterOtherStats);
