import { Schema } from "mongoose";
import { Owner, ReqBool, ReqName, ReqString } from "../common";

export const ItemSchema = new Schema(
  {
    _id: String,
    name: ReqName,
    owner: Owner,
    description: String,
    equipable: ReqBool,
    equipped: ReqBool,
    type: ReqString,
    bonus: Number,
    damage: {
      damage_dice_quantity: Number,
      damage_dice_sides: Number,
      damage_addition: Number,
      damage_type: String,
    },
    amount: Number,
    image: String,
  },
  { versionKey: false }
);

export const ItemInstanceSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "Character" },
    item: { type: Schema.Types.ObjectId, ref: "Item" },
    equipped: ReqBool,
    hidden: ReqBool,
    amount: Number,
  },
  { versionKey: false }
);
