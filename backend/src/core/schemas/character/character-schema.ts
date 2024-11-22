import mongoose, { Schema } from "mongoose";

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

const reqNumber = {
  type: Number,
  required: false,
};

const reqBoolean = {
  type: Boolean,
  required: false,
};

const CharacterSchema = new Schema(
  {
    owner: reqOwner,
    name: reqCharacter,
    stats: {
      strength: reqNumber,
      dexterity: reqNumber,
      constitution: reqNumber,
      intelligence: reqNumber,
      wisdom: reqNumber,
      charisma: reqNumber,
    },
    skills: {
      strength: reqBoolean,
      dexterity: reqBoolean,
      constitution: reqBoolean,
      intelligence: reqBoolean,
      wisdom: reqBoolean,
      charisma: reqBoolean,
      acrobatics: reqBoolean,
      animal: reqBoolean,
      arcana: reqBoolean,
      athletics: reqBoolean,
      deception: reqBoolean,
      history: reqBoolean,
      insight: reqBoolean,
      intimidation: reqBoolean,
      investigation: reqBoolean,
      medicine: reqBoolean,
      nature: reqBoolean,
      perception: reqBoolean,
      performance: reqBoolean,
      persuasion: reqBoolean,
      religion: reqBoolean,
      hand: reqBoolean,
      stealth: reqBoolean,
      survival: reqBoolean,
    },
    hp: {
      hp: reqNumber,
      hpTemp: reqNumber,
      hpPool: reqNumber,
    },
    other: {
      ac: reqNumber,
      movement: reqNumber,
      bonus: reqNumber,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Character", CharacterSchema);
