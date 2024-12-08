import { Notes } from "src/core/models/notes/notes-model";
import { ConnectionsManager } from "../../../connectDB";

const NotesModel = () => ConnectionsManager.Instance.db.model("Notes");

export async function _putNotes(owner: String, notes: Notes) {
  await NotesModel().findOneAndUpdate(
    {
      owner: owner,
    },
    {
      ...notes,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
