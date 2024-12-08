import { ConnectionsManager } from "../../../connectDB";
import { Player } from "../../../core/models/player-model";
import { normalizeString } from "../../../stringNormalizer";

const PlayerModel = () => ConnectionsManager.Instance.db.model("Player");

/**
 * Creates a new player
 * @param player player to create
 * @returns return the created player if no other player with the same id exists, otherwise throws an error
 */
export async function _postPlayer(player: Player) {
  let id = normalizeString(player.name);
  const matchingNames = await PlayerModel().find({ name: player.name });
  const matchingId = await PlayerModel().findById(id);
  if (matchingNames.length > 0 || matchingId) return;
  // Set the id and creation_date
  return await PlayerModel().create({ _id: id, ...player });
}
