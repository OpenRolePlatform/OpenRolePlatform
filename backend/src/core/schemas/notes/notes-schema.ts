import { Schema } from "mongoose";
import { ReqString } from "../common";

export const NotesSchema = new Schema(
  {
    _id: String,
    text: ReqString,
  },
  { versionKey: false }
);
