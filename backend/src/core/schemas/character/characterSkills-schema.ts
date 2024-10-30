import mongoose, { Schema } from "mongoose";

const reqBoolean = {
  type: Boolean,
  required: true,
};

const reqCharacter = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

const characterSkills = new Schema({
  character: reqCharacter,
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

export default mongoose.model("characterSkills", characterSkills);
