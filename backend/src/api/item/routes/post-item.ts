import { ConnectionsManager } from "../../../connectDB";
import { Item } from "../../../core/models/item/item-model";
import { normalizeString } from "../../../stringNormalizer";

const ItemModel = () => ConnectionsManager.Instance.campaignDB.model("Item");
const CharacterModel = () =>
  ConnectionsManager.Instance.campaignDB.model("Character");

export async function _postItems(items: Item | Array<Item>) {
  if (Array.isArray(items)) {
    let createdItems: Array<Item> = [];
    for (const item of items) {
      let newItem = await addItem(item);
      createdItems.push(newItem);
    }
    return createdItems;
  } else return await addItem(items);
}

export async function addItem(newItem: Item) {
  let id = normalizeString(newItem.name);
  const matchingNames = await ItemModel().find({ name: newItem.name });
  const matchingId = await ItemModel().findById(id);

  if (matchingNames.length > 0 || matchingId) return;
  let item;
  // Set the id and creation_date
  if (newItem.owner) {
    let character = await CharacterModel().findById(newItem.owner);
    if (character) {
      item = await ItemModel().create({ _id: id, ...newItem });
    }
  } else item = await ItemModel().create({ _id: id, ...newItem });
  return item;
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
