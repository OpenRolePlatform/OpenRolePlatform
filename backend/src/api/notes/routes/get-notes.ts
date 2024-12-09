import { ConnectionsManager } from "../../../connectDB";

const NotesModel = () => ConnectionsManager.Instance.campaignDB.model("Notes");
/**
 * Get the notes of the players
 * @param id players id to get the notes of
 * @returns Notes of the players
 */
export async function _getNotes(id: string) {
  return await NotesModel().findById(id);
}
