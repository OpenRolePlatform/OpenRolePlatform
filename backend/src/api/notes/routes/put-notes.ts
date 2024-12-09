import { Notes } from "src/core/models/notes/notes-model";
import { ConnectionsManager } from "../../../connectDB";

const NotesModel = () => ConnectionsManager.Instance.campaignDB.model("Notes");

export async function _putNotes(id: String, notes: Notes) {
  let res = await NotesModel().findOneAndUpdate(
    {
      _id: id,
    },
    notes,
    { new: true, upsert: true }
  );

  return res;
}
