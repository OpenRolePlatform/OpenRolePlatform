import { Model } from "mongoose";
import { ConnectionsManager } from "../../../connectDB";
import { Player } from "../../../core/models/player-model";

const PlayerModel = () =>
  ConnectionsManager.Instance.db.model("Player") as Model<Player>;

const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");
/**
 * Update one character
 * @param playerID id of the character to update
 * @param character new data of the character
 * @returns the updated character data
 */
export async function _enrollPlayer(playerID: string, campaignID: string) {
  let player = await PlayerModel().findById(playerID);
  let campaign = await CampaignModel().findById(campaignID);

  if (player && campaign) {
    if (!player?.campaigns.includes(campaign?._id))
      player?.campaigns.push(campaign?._id);
    if (!campaign.players.includes(player?._id))
      campaign.players.push(player?._id);
  }

  campaign.save();
  player?.save();
  return [player, campaign];
}
