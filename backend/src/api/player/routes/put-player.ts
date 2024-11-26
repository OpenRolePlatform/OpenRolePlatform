import { ConnectionsManager } from "../../../connectDB";
import { Player } from "../../../core/models/player-model";

const PlayerModel = () => ConnectionsManager.Instance.db.model("Player");

/**
 * Update one players
 * @param id id of the players to update
 * @param player new data of the players
 * @returns the updated players data
 */
export async function _putPlayer(id: string, player: Player) {
  return await PlayerModel().findByIdAndUpdate(id, player, {
    new: true,
  });
}
