import { Schema } from "mongoose";
import { ReqName } from "../common";

export const PlayerSchema = new Schema(
  {
    _id: String,
    name: ReqName,
    description: String,
    creation_date: { type: Date, default: Date.now },
    image: String,
    campaigns: [{ type: Schema.Types.ObjectId, ref: "Champaign" }],
  },
  { versionKey: false }
);
