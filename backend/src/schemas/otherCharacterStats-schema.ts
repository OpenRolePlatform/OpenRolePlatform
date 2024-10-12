import { model, Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const otherCharacterStats = new Schema({
  character: reqString,
  ac: reqNumber,
  movement: reqNumber,
  bonus: reqNumber,
});

export default model("otherCharacterStats", otherCharacterStats);
