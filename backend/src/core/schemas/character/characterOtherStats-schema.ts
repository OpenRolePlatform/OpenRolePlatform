import { model, Schema } from "mongoose";

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

export default model("characterOtherStats", characterOtherStats);
