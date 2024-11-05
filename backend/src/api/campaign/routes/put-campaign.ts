import { Campaign } from "../../../core/models/campaign/campaign-model";
import Campaigns from "../../../core/schemas/campaign/campaign-schema";

export async function _putCampaign(name: String, campaign: Campaign) {
  campaign.creation_date = new Date();
  await Campaigns.findOneAndUpdate(
    {
      name: name,
    },
    {
      ...campaign,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
