import { ConnectionsManager } from "../../../connectDB";

const PlayerModel = () => ConnectionsManager.Instance.db.model("Player");

/**
 * Function to get all players in the database
 * @returns returns a list of all player
 */
export async function _getAllPlayers() {
  return await PlayerModel().find({});
}
