import { Schema } from "mongoose";
import { Name } from "../common";

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

export const CharacterSchema = new Schema(
  {
    _id: String,
    owner: reqOwner,
    name: Name,
    image: String,
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
