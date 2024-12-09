import { ConnectionsManager } from "../../../connectDB";
import { Notes } from "../../../core/models/notes/notes-model";

const NotesModel = () => ConnectionsManager.Instance.db.model("Notes");

export async function _postNotes(owner: string, notes: Notes) {
  const matchingId = await NotesModel().findById(owner);
  if (matchingId) return;
  return await NotesModel().create({
    _id: owner,
    ...notes,
  });
}
