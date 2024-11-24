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

const reqBoolIndex = {
  type: Boolean,
  require: true,
  index: true,
};

const reqBool = {
  type: Boolean,
  require: true,
};

const reqString = {
  type: String,
  require: true,
};

const reqNumber = {
  type: Number,
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

export const SpellSchema = new Schema(
  {
    owner: reqOwner,
    name: reqName,
    class: reqString,
    level: reqNumber,
    school: reqString,
    casting_time: reqNumber,
    duration: reqNumber,
    range: reqNumber,
    shape: reqString,
    components: {
      verbal: reqBool,
      somatic: reqBool,
      material: reqBool,
    },
    description: String,
    equipable: reqBoolIndex,
    equipped: reqBoolIndex,
    type: reqString,
    bonus: Number,
    damage: DamageSchema,
    hidden: reqBoolIndex,
  },
  { versionKey: false }
);

export default mongoose.model("Spell", SpellSchema);
