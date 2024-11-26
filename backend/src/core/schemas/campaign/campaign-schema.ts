import { Schema } from "mongoose";
import { ReqName } from "../common";

export const CampaignSchema = new Schema(
  {
    _id: String,
    name: ReqName,
    description: String,
    creation_date: { type: Date, default: Date.now },
    image: String,
    player: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    dm: { type: Schema.Types.ObjectId, ref: "Player" },
  },
  { versionKey: false }
);
