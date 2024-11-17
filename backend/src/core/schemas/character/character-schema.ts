import mongoose, { Schema } from "mongoose";

const reqStat = {
  type: Schema.Types.ObjectId,
  ref: "characterStats",
  required: false,
};

const reqSkills = {
  type: Schema.Types.ObjectId,
  ref: "characterSkills",
  required: false,
};

const reqHp = {
  type: Schema.Types.ObjectId,
  ref: "hpStats",
  required: false,
};

const reqOther = {
  type: Schema.Types.ObjectId,
  ref: "otherCharacterStats",
  required: false,
};

const reqCharacter = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

const reqOwner = {
  type: String,
  require: true,
  index: true,
  unique: false,
};

const CharacterSchema = new Schema(
  {
    owner: reqOwner,
    name: reqCharacter,
    stats: reqStat,
    skills: reqSkills,
    hp: reqHp,
    other: reqOther,
  },
  { versionKey: false }
);

export default mongoose.model("Character", CharacterSchema);
