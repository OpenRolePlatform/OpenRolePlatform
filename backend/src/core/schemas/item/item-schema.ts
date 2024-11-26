import { Schema } from "mongoose";
import { Damage } from "src/core/models/damage-model";
import { ReqBool, ReqName, ReqOwner, ReqString } from "../common";

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
    owner: ReqOwner,
    name: ReqName,
    description: String,
    equipable: ReqBool,
    equipped: ReqBool,
    type: ReqString,
    bonus: Number,
    damage: DamageSchema,
    hidden: ReqBool,
  },
  { versionKey: false }
);

//export default mongoose.model("Item", ItemSchema);
