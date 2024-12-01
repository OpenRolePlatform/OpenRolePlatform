import { ConnectionsManager } from "../../ConnectionsManager";
import { Item } from "../../core/models/item/item-model";
import { normalizeString } from "../../stringNormalizer";

const ItemModel = () => ConnectionsManager.Instance.campaignDB.model("Item");

export async function getAllItems() {
  return await ItemModel().find({});
}

export async function getItem(owner: String, name: String) {
  return await ItemModel().findOne({
    owner: owner,
    name: name,
  });
}

export async function createItems(item: Item | Array<Item>) {
  if (Array.isArray(item)) {
    let createdItems: Array<Item> = [];
    item.forEach(async (item) => {
      let newItem = await addItem(item);
      createdItems.push(newItem);
    });
    return createItems;
  } else {
    let newItem = await addItem(item);
    return newItem;
  }
}

export async function addItem(item: Item) {
  let id = normalizeString(item.name);
  const matchingNames = await ItemModel().find({ name: item.name });
  const matchingId = await ItemModel().findById(id);
  if (matchingNames.length > 0 || matchingId) return;
  // Set the id and creation_date
  return await ItemModel().create({ _id: id, ...item });
}

export async function updateItem(owner: String, name: String, item: Item) {
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
