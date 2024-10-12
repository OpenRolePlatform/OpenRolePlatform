import { model, Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const characterStats = new Schema({
  character: reqString,
  strength: reqNumber,
  dexterity: reqNumber,
  constitution: reqNumber,
  intelligence: reqNumber,
  wisdom: reqNumber,
  charisma: reqNumber,
});

export default model("characterStats", characterStats);
