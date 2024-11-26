import { ConnectionsManager } from "../../../connectDB";

const PlayerModel = () => ConnectionsManager.Instance.db.model("Player");
/**
 * Get the details of the players
 * @param id players id to get details of
 * @returns Details of the players
 */
export async function _getPlayerDetails(id: string) {
  return await PlayerModel().findById(id).populate(["dm", "player"]);
}
