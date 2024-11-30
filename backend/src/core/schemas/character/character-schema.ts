import { Schema } from "mongoose";
import { ReqBool, ReqName, ReqNumber, ReqOwner } from "../common";

export const StatNumber = {
  type: Number,
  required: true,
  default: 10,
};

export const CharacterSchema = new Schema(
  {
    _id: String,
    owner: ReqOwner,
    name: ReqName,
    image: String,
    stats: {
      strength: StatNumber,
      dexterity: StatNumber,
      constitution: StatNumber,
      intelligence: StatNumber,
      wisdom: StatNumber,
      charisma: StatNumber,
    },
    skills: {
      strength: ReqBool,
      dexterity: ReqBool,
      constitution: ReqBool,
      intelligence: ReqBool,
      wisdom: ReqBool,
      charisma: ReqBool,
      acrobatics: ReqBool,
      animal: ReqBool,
      arcana: ReqBool,
      athletics: ReqBool,
      deception: ReqBool,
      history: ReqBool,
      insight: ReqBool,
      intimidation: ReqBool,
      investigation: ReqBool,
      medicine: ReqBool,
      nature: ReqBool,
      perception: ReqBool,
      performance: ReqBool,
      persuasion: ReqBool,
      religion: ReqBool,
      hand: ReqBool,
      stealth: ReqBool,
      survival: ReqBool,
    },
    hp: {
      hp: ReqNumber,
      hpTemp: ReqNumber,
      hpPool: ReqNumber,
    },
    other: {
      ac: ReqNumber,
      movement: ReqNumber,
      bonus: ReqNumber,
    },
  },
  { versionKey: false }
);
