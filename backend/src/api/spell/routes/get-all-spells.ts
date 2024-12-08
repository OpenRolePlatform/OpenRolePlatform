import { Spell } from "src/core/models/spell/spell-model";
import { ConnectionsManager } from "../../../connectDB";

const SpellModel = () => ConnectionsManager.Instance.campaignDB.model("Spell");

export async function _getAllSpells(
  owner: String,
  spell: Spell,
  hidden: boolean
) {
  if (owner !== "*") spell.owner = owner;
  spell.hidden = hidden;
  return await SpellModel().find({
    ...spell,
  });
}
