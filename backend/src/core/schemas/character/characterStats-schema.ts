import mongoose, { Schema } from "mongoose";

const reqNumber = {
  type: Number,
  required: true,
};

const reqCharacter = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

const characterStats = new Schema({
  character: reqCharacter,
  strength: reqNumber,
  dexterity: reqNumber,
  constitution: reqNumber,
  intelligence: reqNumber,
  wisdom: reqNumber,
  charisma: reqNumber,
});

export default mongoose.model("characterStats", characterStats);
