import { Model } from "mongoose";
import { ConnectionsManager } from "../../../connectDB";
import { Player } from "../../../core/models/player-model";

const PlayerModel = () =>
  ConnectionsManager.Instance.db.model("Player") as Model<Player>;

const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");
/**
 * Update one character
 * @param id id of the character to update
 * @param character new data of the character
 * @returns the updated character data
 */
export async function _enrollPlayer(id: string, campaign: string) {
  let player = await PlayerModel().findById(id);
  let campaignInstance = await CampaignModel().findById(campaign);

  if (!player?.campaigns.includes(campaign)) player?.campaigns.push(campaign);
  if (!campaignInstance.players.includes(id))
    campaignInstance.players.push(player?._id);

  campaignInstance.save();
  player?.save();

  return [player, campaignInstance];
}
