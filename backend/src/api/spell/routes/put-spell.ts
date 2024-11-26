import { Spell } from "src/core/models/spell/spell-model";
import { ConnectionsManager } from "../../../connectDB";

const SpellModel = () => ConnectionsManager.Instance.campaignDB.model("Spell");

export async function _putSpell(owner: String, name: String, spell: Spell) {
  await SpellModel().findOneAndUpdate(
    {
      owner: owner,
      name: name,
    },
    {
      ...spell,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
