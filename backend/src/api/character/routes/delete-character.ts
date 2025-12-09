import { prisma } from "../../../connectDB";

export const _deleteCharacter = async (id: string) => {
  return await prisma.character.delete({
    where: { id }
  });
};
