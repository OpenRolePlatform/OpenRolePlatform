import { ConnectionsManager } from "../../../connectDB";
import { Campaign } from "../../../core/models/campaign/campaign-model";
import { normalizeString } from "../../../stringNormalizer";
const CampaignModel = () => ConnectionsManager.Instance.db.model("Campaign");

/**
 * Creates a new campaign
 * @param campaign campaign to create
 * @returns return the created campaign if no other campaign with the same id exists, otherwise throws an error
 */
export async function _postCampaign(campaign: Campaign) {
  let id = normalizeString(campaign.name);
  const matchingNames = await CampaignModel().find({ name: campaign.name });
  const matchingId = await CampaignModel().findById(id);
  if (matchingNames.length > 0 || matchingId) return;
  // Set the id and creation_date
  return await CampaignModel().create({ _id: id, ...campaign });
}
