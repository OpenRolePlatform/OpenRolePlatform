import { ConnectionsManager } from "../../../connectDB";

const NotesModel = () => ConnectionsManager.Instance.db.model("Notes");

/**
 * Function to get all notes in the database
 * @returns returns a list of all notes
 */
export async function _getAllNotes() {
  return await NotesModel().find({});
}
