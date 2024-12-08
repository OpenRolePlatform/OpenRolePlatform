import express from "express";
import { getNote, getNotes, postNotes, putNotes } from "./notes-handler";

//player router
const notesRouter = express.Router();

//get methods
notesRouter.get("/", getNotes);
notesRouter.get("/:playerID", getNote);

//post methods
notesRouter.post("/:playerID", postNotes);

//put methods
notesRouter.put("/:playerID", putNotes);

export default notesRouter;
