import { Campaign } from "../../../core/models/campaign/campaign-model";
import CampaignSchema from "../../../core/schemas/campaign/campaign-schema";

export async function _putCampaign(name: String, campaign: Campaign) {
  campaign.creation_date = new Date();
  await CampaignSchema.findOneAndUpdate(
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
