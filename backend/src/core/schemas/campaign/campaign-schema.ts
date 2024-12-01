import { Schema } from "mongoose";
import { ReqName } from "../common";

export const CampaignSchema = new Schema(
  {
    _id: String,
    name: ReqName,
    description: String,
    creation_date: { type: Date, default: Date.now },
    image: String,
    status: { type: String, default: "active" },
    players: [{ type: String, ref: "Player", unique: true }],
  },
  { versionKey: false }
);
