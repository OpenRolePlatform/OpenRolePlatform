import { prisma } from "../../../connectDB";
import { ItemAdapter } from "../../../core/adapters/item-adapter";
import { ItemInputSchema } from "../../../core/validation/zod-schemas";

export const _postItem = async (data: any) => {

  const parseIfString = (val: any) => {
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch (e) { return val; }
    }
    return val;
  };

  if (data.damage) {
    data.damage = parseIfString(data.damage);
  }

  const validated = ItemInputSchema.parse(data);

  const { meta, systemData } = ItemAdapter.toDatabase(validated);

  const newItem = await prisma.item.create({
    data: {
      ...meta,
      systemData: systemData
    }
  });

  return ItemAdapter.toFrontend(newItem);
};
