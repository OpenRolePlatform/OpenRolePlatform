import { prisma } from "../../../connectDB";
import { ItemAdapter } from "../../../core/adapters/item-adapter";

export const _getOneItem = async (id: string) => {
  const item = await prisma.item.findUnique({
    where: { id }
  });

  if (!item) return null;

  return ItemAdapter.toFrontend(item);
};
