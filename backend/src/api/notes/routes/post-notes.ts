import { ConnectionsManager } from "../../../connectDB";
import { Notes } from "../../../core/models/notes/notes-model";
import { normalizeString } from "../../../stringNormalizer";

const NotesModel = () => ConnectionsManager.Instance.db.model("Notes");

export async function _postNotes(owner: string, notes: Notes) {
  let id = normalizeString(owner);

  const matchingId = await NotesModel().findById(id);
  if (matchingId) return;
  return await NotesModel().create({
    _id: id,
    ...notes,
  });
}
