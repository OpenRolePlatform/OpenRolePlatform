import mongoose, { Schema } from "mongoose";
import { Damage } from "src/core/models/damage-model";
import { Name } from "../common";

const reqOwner = {
  type: String,
  require: true,
  index: true,
};

const reqBool = {
  type: Boolean,
  require: true,
  index: true,
};

const reqString = {
  type: String,
  require: true,
};

const DamageSchema = new Schema<Damage>(
  {
    damage_dice_quantity: Number,
    damage_dice_sides: Number,
    damage_addition: Number,
    damage_type: String,
  },
  { versionKey: false }
);

export const ItemSchema = new Schema(
  {
    _id: String,
    name: Name,
    description: String,
    equipable: reqBool,
    type: reqString,
    bonus: Number,
    damage: DamageSchema,
  },
  { versionKey: false }
);

export const ItemInstanceSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "Character" },
    item: { type: Schema.Types.ObjectId, ref: "Item" },
    equipped: reqBool,
    hidden: reqBool,
    amount: Number,
  },
  { versionKey: false }
);

export default mongoose.model("Item", ItemSchema);
