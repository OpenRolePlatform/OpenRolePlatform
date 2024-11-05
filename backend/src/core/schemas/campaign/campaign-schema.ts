import { Schema } from "mongoose";
import { db } from "../../../connectDB";

const reqName = {
  type: String,
  require: true,
  index: true,
  unique: true,
};

const Campaigns = new Schema({
  name: reqName,
  description: String,
  creation_date: Date,
});

export default db.model("Campaigns", Campaigns);
