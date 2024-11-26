import { ConnectionsManager } from "../../connectDB";
import { Player } from "../../core/models/player-model";
import { normalizeString } from "../../stringNormalizer";

const PlayerModel = () => ConnectionsManager.Instance.db.model("Player");

const CampaignPlayerModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Player");

/**
 * Function to get all players in the database
 * @returns returns a list of all player
 */
export async function getAllPlayers() {
  return await PlayerModel().find({});
}

/**
 * Creates a new player
 * @param player player to create
 * @returns return the created player if no other player with the same id exists, otherwise throws an error
 */
export async function createPlayer(player: Player) {
  let id = normalizeString(player.name);
  const matchingNames = await PlayerModel().find({ name: player.name });
  const matchingId = await PlayerModel().findById(id);
  if (matchingNames.length > 0 || matchingId) return;
  // Set the id and creation_date
  return await PlayerModel().create({ _id: id, ...player });
}

/**
 * Get the details of the players
 * @param id players id to get details of
 * @returns Details of the players
 */
export async function getPlayerDetails(id: string) {
  return await PlayerModel().findById(id).populate(["dm", "player"]);
}

/**
 * Update one players
 * @param id id of the players to update
 * @param player new data of the players
 * @returns the updated players data
 */
export async function updatePlayer(id: string, player: Player) {
  return await PlayerModel().findByIdAndUpdate(id, player, {
    new: true,
  });
}

/**
 * delete one players by id
 * @param id id of the players to delete
 */
export async function deletePlayer(id: string) {
  return await PlayerModel().findByIdAndDelete(id);
}
