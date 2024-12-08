import { ConnectionsManager } from "../../../connectDB";

const NotesModel = () => ConnectionsManager.Instance.db.model("Notes");

export async function _putNotes(owner: String, text: String) {
  return await NotesModel().findOneAndUpdate(
    {
      _id: owner,
    },
    {
      text: text,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
