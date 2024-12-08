import { Schema } from "mongoose";
import { Owner, ReqBool, ReqName, ReqNumber, ReqString } from "../common";

export const SpellSchema = new Schema(
  {
    _id: String,
    name: ReqName,
    owner: Owner,
    description: String,
    class: ReqString,
    level: ReqNumber,
    school: ReqString,
    casting_time: ReqNumber,
    duration: ReqNumber,
    range: ReqNumber,
    shape: ReqString,
    components: {
      verbal: ReqBool,
      somatic: ReqBool,
      material: ReqBool,
    },
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
    hidden: ReqBool,
  },
  { versionKey: false }
);
