import { prisma } from "../../../connectDB";
import { ItemAdapter } from "../../../core/adapters/item-adapter";

export const _getAllItems = async () => {
  const items = await prisma.item.findMany();
  return items.map(item => ItemAdapter.toFrontend(item));
};
