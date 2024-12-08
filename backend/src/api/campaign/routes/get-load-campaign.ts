import { ConnectionsManager } from "../../../connectDB";
import { Campaign } from "../../../core/models/campaign/campaign-model";
import { _getCampaign } from "./get-campaign";

/**
 * Load one campaign database
 * @param id id of the campaign to load
 * @returns the data of the campaign loaded
 */
export async function _getLoadCampaign(id: string) {
  let campaign = (await _getCampaign(id)) as Campaign;
  if (!campaign) return campaign;
  let connected = await ConnectionsManager.Instance.connectCampaign(campaign);
  return campaign;
}
