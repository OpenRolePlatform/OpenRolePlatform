import { Spell } from "src/core/models/spell/spell-model";
import SpellSchema from "../../../core/schemas/spell/spell-schema";

export async function _putOneSpell(owner: String, name: String, spell: Spell) {
  await SpellSchema.findOneAndUpdate(
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
