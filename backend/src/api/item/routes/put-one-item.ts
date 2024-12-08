import { ConnectionsManager } from "../../../connectDB";
import { Item } from "../../../core/models/item/item-model";

const ItemModel = () => ConnectionsManager.Instance.campaignDB.model("Item");

export async function _putOneItem(owner: String, name: String, item: Item) {
  await ItemModel().findOneAndUpdate(
    {
      owner: owner,
      name: name,
    },
    {
      ...item,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
