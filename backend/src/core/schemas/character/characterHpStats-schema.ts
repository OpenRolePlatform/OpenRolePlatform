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

const hpStats = new Schema(
  {
    character: reqCharacter,
    hp: reqNumber,
    hpTemp: reqNumber,
    hpPool: reqNumber,
  },
  { versionKey: false }
);

export default mongoose.model("hpStats", hpStats);
