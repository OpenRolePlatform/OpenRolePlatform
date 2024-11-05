import { Item } from "src/core/models/item/item-model";
import ItemSchema from "../../../core/schemas/item/item-schema";

export async function _getAllItems(owner: String, item: Item, hidden: boolean) {
  item.owner = owner;
  item.hidden = hidden;
  return await ItemSchema.find({
    ...item,
  });
}
