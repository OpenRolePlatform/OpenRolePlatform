import { prisma } from "../../../connectDB";

export const _deleteCampaign = async (id: string) => {
  return await prisma.campaign.delete({
    where: { id }
  });
};
