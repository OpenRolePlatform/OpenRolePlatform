import { model, Schema } from "mongoose";

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

const CharacterSchema = new Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  stats: reqStat,
  skills: reqSkills,
  hp: reqHp,
  other: reqOther,
});

export default model("CharacterSchema", CharacterSchema);
