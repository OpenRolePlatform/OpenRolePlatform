import { Item } from "src/core/models/item/item-model";

export async function _getAllItems(owner: String, item: Item, hidden: boolean) {
  /* if (owner !== "*") item.owner = owner;
  item.hidden = hidden;
  return await ItemSchema.find({
    ...item,
  }); */
  return undefined;
}
