import { ConnectionsManager } from "../../connectDB";
import { Item } from "../../core/models/item/item-model";

const ItemModel = () => ConnectionsManager.Instance.campaignDB.model("Item");

export async function getAllItems(owner: String, item: Item, hidden: boolean) {
  if (owner !== "*") item.owner = owner;
  item.hidden = hidden;
  return await ItemModel().find({
    ...item,
  });
}

export async function getItem(owner: String, name: String) {
  return await ItemModel().findOne({
    owner: owner,
    name: name,
  });
}

export async function createItem(owner: String, name: String, item: Item) {
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
