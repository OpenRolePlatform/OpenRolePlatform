import { Schema } from "mongoose";
import { campaignDB } from "../../connectCampaign";

const reqNumber = {
  type: Number,
  required: true,
};

const reqCharacter = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

const characterOtherStats = new Schema({
  character: reqCharacter,
  ac: reqNumber,
  movement: reqNumber,
  bonus: reqNumber,
});

export default campaignDB.model("characterOtherStats", characterOtherStats);
