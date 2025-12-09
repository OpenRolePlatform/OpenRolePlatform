import { prisma } from "../../../connectDB";
import { SpellAdapter } from "../../../core/adapters/spell-adapter";
import { SpellInputSchema } from "../../../core/validation/zod-schemas";

export const _postSpell = async (data: any) => {
  const validated = SpellInputSchema.parse(data);
  const { meta, systemData } = SpellAdapter.toDatabase(validated);

  const newSpell = await prisma.spell.create({
    data: {
      ...meta,
      systemData
    }
  });

  return SpellAdapter.toFrontend(newSpell);
};
