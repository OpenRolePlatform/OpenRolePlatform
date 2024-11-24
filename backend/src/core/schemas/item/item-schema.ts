import mongoose, { Schema } from "mongoose";
import { Damage } from "src/core/models/damage-model";

const reqOwner = {
  type: String,
  require: true,
  index: true,
};

const reqName = {
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
    owner: reqOwner,
    name: reqName,
    description: String,
    equipable: reqBool,
    equipped: reqBool,
    type: reqString,
    bonus: Number,
    damage: DamageSchema,
    hidden: reqBool,
  },
  { versionKey: false }
);

export default mongoose.model("Item", ItemSchema);
