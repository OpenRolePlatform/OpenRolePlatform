import { ConnectionsManager } from "../../../connectDB";
import { Campaign } from "../../../core/models/campaign/campaign-model";

const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");

/**
 * Update one campaign
 * @param id id of the campaign to update
 * @param campaign new data of the campaign
 * @returns the updated campaign data
 */
export async function _putCampaign(id: string, campaign: Campaign) {
  return await CampaignModel().findByIdAndUpdate(id, campaign, {
    new: true,
  });
}
