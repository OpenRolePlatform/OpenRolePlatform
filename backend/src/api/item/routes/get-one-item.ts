import { ConnectionsManager } from "../../../connectDB";

const ItemModel = () => ConnectionsManager.Instance.campaignDB.model("Item");

export async function _getOneItem(owner: String, name: String) {
  return await ItemModel().findOne({
    owner: owner,
    name: name,
  });
}
