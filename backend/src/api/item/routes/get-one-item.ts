import ItemSchema from "../../../core/schemas/item/item-schema";

export async function _getOneItem(owner: String, name: String) {
  return await ItemSchema.findOne({
    owner: owner,
    name: name,
  });
}
