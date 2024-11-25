import { Schema } from "mongoose";
import { Name } from "../common";

export const CampaignSchema = new Schema(
  {
    _id: String,
    name: Name,
    description: String,
    creation_date: { type: Date, default: Date.now },
    image: String,
    player: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    dm: { type: Schema.Types.ObjectId, ref: "Player" },
  },
  { versionKey: false }
);
