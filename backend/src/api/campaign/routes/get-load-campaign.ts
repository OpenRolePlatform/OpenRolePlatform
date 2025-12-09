import { prisma } from "../../../connectDB";
import { CampaignAdapter } from "../../../core/adapters/campaign-adapter";

export const _getLoadCampaign = async (id: string) => {

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      players: { include: { player: true } },
      characters: {
        include: {
          inventory: { include: { item: true } },
          player: true
        }
      }
    }
  });

  if (!campaign) return null;
  return CampaignAdapter.toFrontend(campaign);
};
