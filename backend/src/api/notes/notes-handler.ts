import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { _getAllNotes } from "./routes/get-all-notes";
import { _getNotes } from "./routes/get-notes";
import { _postNotes } from "./routes/post-notes";
import { _putNotes } from "./routes/put-notes";

// GET Methods
export const getNotes = async (req: any, res: any) => {
  try {
    const notes = await _getAllNotes();
    if (notes) return res.status(StatusCodes.OK).send(notes);
    else return res.status(StatusCodes.NOT_FOUND).send("Notes not found.");
  } catch (error: any) {
    console.error("Error while trying to obtain all notes.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain all notes." + error.message);
  }
};

export const getNote = async (req: any, res: any) => {
  try {
    const notes = await _getNotes(req.params.playerID);
    if (!notes)
      return res.status(StatusCodes.NOT_FOUND).send("Notes not found.");
    else res.status(StatusCodes.OK).send(notes);
  } catch (error: any) {
    console.error("Error while trying to obtain the notes.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the notes: " + error.message);
  }
};

// POST Methods
export const postNotes = async (req: any, res: any) => {
  try {
    const newNotes = await _postNotes(req.params.playerID, req.body);
    console.log(newNotes);

    if (!newNotes)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Notes with this same id already exists");

    res.status(StatusCodes.CREATED).send(newNotes);
  } catch (error: any) {
    console.error("Error while trying to create notes.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to create notes: " + error.message);
  }
};

// PUT Methods
export const putNotes = async (req: any, res: any) => {
  try {
    console.log(req.params.playerID);
    console.log(req.body);
    const response = await _putNotes(req.params.playerID, req.body);
    res.status(StatusCodes.OK).send("Notes updated correctly.");
  } catch (error: any) {
    console.error("Error while trying to update the notes.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the notes: " + error.message);
  }
};
