import { prisma } from "../../../connectDB";

export const _deletePlayer = async (id: string) => {
  return await prisma.player.delete({
    where: { id }
  });
};
