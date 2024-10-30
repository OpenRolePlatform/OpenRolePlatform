import connectCampaignDB from "../../../core/connectCampaign";

export async function _getSelectCampaign(name: string) {
  return connectCampaignDB(name);
}
