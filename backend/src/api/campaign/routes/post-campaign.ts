import { Campaign } from "../../../core/models/campaign/campaign-model";
import Campaigns from "../../../core/schemas/campaign/campaign-schema";

export async function _postCampaign(campaign: Campaign) {
  const matchingCampaigns = await Campaigns.find({ name: campaign.name });
  if (matchingCampaigns.length > 0)
    throw new Error("A campaign with this name already exists");

  campaign.creation_date = new Date();
  return await Campaigns.create(campaign);
}
