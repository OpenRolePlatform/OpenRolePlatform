import { Schema } from "mongoose";
import { Name } from "../common";

export const PlayerSchema = new Schema(
  {
    _id: String,
    name: Name,
    description: String,
    creation_date: { type: Date, default: Date.now },
    image: String,
    campaigns: {
      player: [{ type: Schema.Types.ObjectId, ref: "Champaign" }],
      dm: [{ type: Schema.Types.ObjectId, ref: "Champaign" }],
    },
  },
  { versionKey: false }
);
