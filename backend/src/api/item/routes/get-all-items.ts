import { Item } from "src/core/models/item/item-model";
import ItemSchema from "../../../core/schemas/item/item-schema";

export async function _getAllItems(owner: String, item: Item, hidden: boolean) {
  console.log(item.name);
  console.log(item.equipped);
  return await ItemSchema.find({
    $and: [
      { owner: owner },
      { name: item.name },
      { equipable: item.equipable },
      { equipped: item.equipped },
      { type: item.type },
      { hidden: hidden },
    ].filter((p) => p !== undefined),
  });
}
