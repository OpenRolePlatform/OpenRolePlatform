import { prisma } from "../../../connectDB";
import { ItemAdapter } from "../../../core/adapters/item-adapter";
import { ItemInputSchema } from "../../../core/validation/zod-schemas";

export const _putOneItem = async (id: string, data: any) => {

  const parseIfString = (val: any) => {
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch (e) { return val; }
    }
    return val;
  };

  if (data.damage) {
    data.damage = parseIfString(data.damage);
  }

  const validatedData = ItemInputSchema.partial().parse(data);

  const existingItem = await prisma.item.findUnique({ where: { id } });
  if (!existingItem) return null;

  const { meta, systemData: newSystemData } = ItemAdapter.toDatabase(validatedData as any);

  const currentSystemData = (existingItem.systemData as any) || {};

  const cleanNewSystemData = JSON.parse(JSON.stringify(newSystemData));

  const mergedSystemData = {
    ...currentSystemData,
    ...cleanNewSystemData
  };

  const updatedItem = await prisma.item.update({
    where: { id },
    data: {
      ...meta,
      systemData: mergedSystemData
    }
  });

  return ItemAdapter.toFrontend(updatedItem);
};
