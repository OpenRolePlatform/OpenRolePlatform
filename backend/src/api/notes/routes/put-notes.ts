import { Notes } from "src/core/models/notes/notes-model";
import { ConnectionsManager } from "../../../connectDB";

const NotesModel = () => ConnectionsManager.Instance.db.model("Notes");

export async function _putNotes(id: String, notes: Notes) {
  let res = await NotesModel().findByIdAndUpdate(
    id,
    {
      $set: { ...notes },
    },
    { new: true }
  );
  return res;
}
