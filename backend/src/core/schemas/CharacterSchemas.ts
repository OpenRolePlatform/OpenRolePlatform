import { model, Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqBoolean = {
  type: Boolean,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const characterSkills = new Schema({
  character: reqString,
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
});

const characterStats = new Schema({
  character: reqString,
  strength: reqNumber,
  dexterity: reqNumber,
  constitution: reqNumber,
  intelligence: reqNumber,
  wisdom: reqNumber,
  charisma: reqNumber,
});

const hpStats = new Schema({
  character: reqString,
  hp: reqNumber,
  hpTemp: reqNumber,
  hpPool: reqNumber,
});

const otherCharacterStats = new Schema({
  character: reqString,
  ac: reqNumber,
  movement: reqNumber,
  bonus: reqNumber,
});

const characterSchema = new Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  stats: characterStats,
  skills: characterSkills,
  hp: hpStats,
  other: otherCharacterStats,
});

export const CharacterModel = model("Character", characterSchema);
