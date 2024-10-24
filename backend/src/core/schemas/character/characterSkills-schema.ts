import { model, Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqBoolean = {
  type: Boolean,
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

export default model("characterSkills", characterSkills);
