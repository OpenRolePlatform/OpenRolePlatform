import { Model } from "mongoose";
import { _enrollPlayer } from "../../../api/player/routes/enroll-player";
import { ConnectionsManager } from "../../../connectDB";
import { Player } from "../../../core/models/player-model";

const PlayerModel = () =>
  ConnectionsManager.Instance.db.model("Player") as Model<Player>;

const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");
/**
 * Update one character
 * @param campaignID id of the character to update
 * @param character new data of the character
 * @returns the updated character data
 */
export async function _enrollPlayers(
  campaignID: string,
  playersIDs: Array<string>
) {
  let players: Array<Player> = [];
  let campaign: any;
  for (const playerID of playersIDs) {
    const [player, modCampaign] = await _enrollPlayer(playerID, campaignID);
    players.push(player);
    campaign = modCampaign;
  }

  return [players, campaign];
}
