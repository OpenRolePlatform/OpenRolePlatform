import { ConnectionsManager } from "../../../connectDB";

export async function _getActiveCampaign() {
  return ConnectionsManager.Instance.campaign;
}
