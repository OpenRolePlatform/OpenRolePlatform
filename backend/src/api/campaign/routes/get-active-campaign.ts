import { prisma } from "../../../connectDB";
import { CampaignAdapter } from "../../../core/adapters/campaign-adapter";

export const _getActiveCampaign = async () => {
  const campaign = await prisma.campaign.findFirst({
    where: { status: 'active' },
    include: {
      players: { include: { player: true } },
      characters: true
    }
  });

  if (!campaign) return null;

  return CampaignAdapter.toFrontend(campaign);
};
