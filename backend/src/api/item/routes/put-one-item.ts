import { Item } from "../../../core/models/item/item-model";
import ItemSchema from "../../../core/schemas/item/item-schema";

export async function _putOneItem(owner: String, name: String, item: Item) {
  await ItemSchema.findOneAndUpdate(
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
