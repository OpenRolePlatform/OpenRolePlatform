import { Schema } from "mongoose";
import { db } from "src/connectDB";

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

const CampaignSchema = new Schema({
  name: reqCharacter,
  description: reqCampaign,
});

export default db.model("CharacterSchema", CampaignSchema);
