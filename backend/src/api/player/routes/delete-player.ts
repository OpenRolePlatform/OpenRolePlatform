import { ConnectionsManager } from "../../../connectDB";

const PlayerModel = () => ConnectionsManager.Instance.db.model("Player");

/**
 * delete one players by id
 * @param id id of the players to delete
 */
export async function deletePlayer(id: string) {
  return await PlayerModel().findByIdAndDelete(id);
}
