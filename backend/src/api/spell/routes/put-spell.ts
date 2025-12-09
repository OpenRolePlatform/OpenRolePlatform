import { prisma } from "../../../connectDB";
import { SpellAdapter } from "../../../core/adapters/spell-adapter";
import { SpellInputSchema } from "../../../core/validation/zod-schemas";

export const _putSpell = async (characterID: string, spellName: string, data: any) => {
  const validated = SpellInputSchema.partial().parse(data);

  const spell = await prisma.spell.findFirst({
    where: { name: { equals: spellName, mode: 'insensitive' } }
  });

  if (!spell) throw new Error("Spell not found");

  const { meta, systemData } = SpellAdapter.toDatabase(validated);

  const mergedSystemData = { ...(spell.systemData as object), ...systemData };

  const updatedSpell = await prisma.spell.update({
    where: { id: spell.id },
    data: {
      ...meta,
      systemData: mergedSystemData
    }
  });

  // Local Update: If they send us a petition to update 'prepared' we do it for this player only
  if (data.prepared !== undefined) {
    await prisma.spellbookEntry.updateMany({
      where: {
        characterId: characterID,
        spellId: spell.id
      },
      data: { prepared: Boolean(data.prepared) }
    });
  }

  return SpellAdapter.toFrontend(updatedSpell);
};
