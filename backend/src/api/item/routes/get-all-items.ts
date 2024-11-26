import { Item } from "src/core/models/item/item-model";
import { ConnectionsManager } from "../../../connectDB";

const ItemModel = () => ConnectionsManager.Instance.campaignDB.model("Item");

export async function _getAllItems(owner: String, item: Item, hidden: boolean) {
  if (owner !== "*") item.owner = owner;
  item.hidden = hidden;
  return await ItemModel().find({
    ...item,
  });
}
