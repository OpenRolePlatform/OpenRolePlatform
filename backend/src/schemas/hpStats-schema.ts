import { model, Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const hpStats = new Schema({
  character: reqString,
  hp: reqNumber,
  hpTemp: reqNumber,
  hpPool: reqNumber,
});

export default model("hpStats", hpStats);
