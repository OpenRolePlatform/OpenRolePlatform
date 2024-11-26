import { Schema } from "mongoose";
import { Damage } from "src/core/models/damage-model";
import { ReqBool, ReqName, ReqNumber, ReqOwner, ReqString } from "../common";

const DamageSchema = new Schema<Damage>(
  {
    damage_dice_quantity: Number,
    damage_dice_sides: Number,
    damage_addition: Number,
    damage_type: String,
  },
  { versionKey: false }
);

export const SpellSchema = new Schema(
  {
    owner: ReqOwner,
    name: ReqName,
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

//export default mongoose.model("Spell", SpellSchema);
