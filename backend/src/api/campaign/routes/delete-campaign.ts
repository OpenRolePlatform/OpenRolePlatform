import { ConnectionsManager } from "../../../connectDB";

const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");

/**
 * delete one campaign by id
 * @param id id of the campaign to delete
 */
export async function deleteCampaign(id: string) {
  return await CampaignModel().findByIdAndDelete(id);
}
