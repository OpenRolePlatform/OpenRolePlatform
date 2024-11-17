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

const characterOtherStats = new Schema(
  {
    character: reqCharacter,
    ac: reqNumber,
    movement: reqNumber,
    bonus: reqNumber,
  },
  { versionKey: false }
);

export default mongoose.model("characterOtherStats", characterOtherStats);
