import { Spell } from "src/core/models/spell/spell-model";
import SpellSchema from "../../../core/schemas/spell/spell-schema";

export async function _getAllSpells(
  owner: String,
  spell: Spell,
  hidden: boolean
) {
  if (owner !== "*") spell.owner = owner;
  spell.hidden = hidden;
  return await SpellSchema.find({
    ...spell,
  });
}
