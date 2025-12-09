import { prisma } from "../../../connectDB";

export const _deleteSpell = async (id: string) => {
  return await prisma.spell.delete({
    where: { id }
  });
};
