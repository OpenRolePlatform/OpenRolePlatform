import { Schema } from "mongoose";
import { Damage } from "src/core/models/damage-model";
import { Owner, ReqBool, ReqName, ReqString } from "../common";

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
    name: ReqName,
    owner: Owner,
    description: String,
    equipable: ReqBool,
    equipped: ReqBool,
    type: ReqString,
    bonus: Number,
    damage: DamageSchema,
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

//export default mongoose.model("Item", ItemSchema);
