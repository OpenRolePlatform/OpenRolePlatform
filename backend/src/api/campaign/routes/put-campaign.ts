import { prisma } from "../../../connectDB";
import { CampaignAdapter } from "../../../core/adapters/campaign-adapter";
import { CampaignInputSchema } from "../../../core/validation/zod-schemas";

export const _putCampaign = async (id: string, data: any) => {
  const validated = CampaignInputSchema.partial().parse(data);

  const existing = await prisma.campaign.findUnique({ where: { id } });
  if (!existing) return null;

  const dbData = CampaignAdapter.toDatabase(validated as any);

  const updatedCampaign = await prisma.campaign.update({
    where: { id },
    data: dbData,
    include: {
      players: { include: { player: true } },
      characters: true
    }
  });

  return CampaignAdapter.toFrontend(updatedCampaign);
};
