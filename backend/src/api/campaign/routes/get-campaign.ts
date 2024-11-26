import { ConnectionsManager } from "../../../connectDB";
const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");

/**
 * Get the details of the campaign
 * @param id campaign id to get details of
 * @returns Details of the campaign
 */
export async function _getCampaign(id: string) {
  return await CampaignModel().findById(id);
}
