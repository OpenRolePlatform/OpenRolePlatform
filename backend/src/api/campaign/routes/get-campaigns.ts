import { ConnectionsManager } from "../../../connectDB";
const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");

/**
 * Function to get all campaigns in the database
 * @returns returns a list of all campaign
 */
export async function _getCampaigns() {
  return await CampaignModel().find({});
}
