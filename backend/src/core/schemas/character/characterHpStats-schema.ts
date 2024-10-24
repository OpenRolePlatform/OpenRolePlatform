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

const hpStats = new Schema({
  campaign: reqCampaign,
  character: reqCharacter,
  hp: reqNumber,
  hpTemp: reqNumber,
  hpPool: reqNumber,
});

export default model("hpStats", hpStats);
