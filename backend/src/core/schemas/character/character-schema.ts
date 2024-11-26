import { Schema } from "mongoose";
import { ReqBool, ReqName, ReqNumber, ReqOwner } from "../common";

export const CharacterSchema = new Schema(
  {
    _id: String,
    owner: ReqOwner,
    name: ReqName,
    image: String,
    stats: {
      strength: ReqNumber,
      dexterity: ReqNumber,
      constitution: ReqNumber,
      intelligence: ReqNumber,
      wisdom: ReqNumber,
      charisma: ReqNumber,
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
