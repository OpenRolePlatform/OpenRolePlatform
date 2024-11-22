import { CampaignManager } from "../../../CampaignManager";

export async function _getSelectCampaign(name: string) {
  return await CampaignManager.Instance.connect(name);
}
