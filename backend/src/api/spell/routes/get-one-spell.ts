import SpellSchema from "../../../core/schemas/spell/spell-schema";

export async function _getOneSpell(owner: String, name: String) {
  return await SpellSchema.findOne({
    owner: owner,
    name: name,
  });
}
