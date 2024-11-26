import { Spell } from "src/core/models/spell/spell-model";
import { ConnectionsManager } from "../../connectDB";

const SpellModel = () => ConnectionsManager.Instance.campaignDB.model("Spell");

export async function getAllSpells(
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

export async function getSpell(owner: String, name: String) {
  return await SpellModel().findOne({
    owner: owner,
    name: name,
  });
}

export async function createSpell(owner: String, name: String, spell: Spell) {
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
