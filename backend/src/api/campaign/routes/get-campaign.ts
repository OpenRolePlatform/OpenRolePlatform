import { prisma } from "../../../connectDB";
import { CampaignAdapter } from "../../../core/adapters/campaign-adapter";

export const _getCampaign = async (id: string) => {
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      players: {
        include: { player: true }
      },
      characters: true
    }
  });

  if (!campaign) return null;

  return CampaignAdapter.toFrontend(campaign);
};
