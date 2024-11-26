import { ConnectionsManager } from "../../../connectDB";

const SpellModel = () => ConnectionsManager.Instance.campaignDB.model("Spell");

export async function _getSpell(owner: String, name: String) {
  return await SpellModel().findOne({
    owner: owner,
    name: name,
  });
}
