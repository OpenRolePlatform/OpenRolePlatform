import CampaignSchema from "../../../core/schemas/campaign/campaign-schema";

export async function _getCampaigns() {
  return await CampaignSchema.find({});
}
