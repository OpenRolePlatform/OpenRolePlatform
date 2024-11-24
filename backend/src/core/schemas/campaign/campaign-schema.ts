import { Schema } from "mongoose";

const reqName = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

export const CampaignSchema = new Schema(
  {
    _id: String,
    name: reqName,
    description: String,
    creation_date: { type: Date, default: Date.now },
    image: String,
  },
  { versionKey: false }
);
