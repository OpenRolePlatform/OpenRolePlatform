import { prisma } from "../../../connectDB";
import { CampaignAdapter } from "../../../core/adapters/campaign-adapter";

export const _getCampaigns = async () => {
  const campaigns = await prisma.campaign.findMany({
    include: {
      players: { include: { player: true } },
      characters: true
    }
  });
  return campaigns.map(CampaignAdapter.toFrontend);
};
