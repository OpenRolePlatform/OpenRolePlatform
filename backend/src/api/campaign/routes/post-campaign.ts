import { prisma } from "../../../connectDB";
import { CampaignAdapter } from "../../../core/adapters/campaign-adapter";
import { CampaignInputSchema } from "../../../core/validation/zod-schemas";

export const _postCampaign = async (data: any) => {
  const validated = CampaignInputSchema.parse(data);
  const dbData = CampaignAdapter.toDatabase(validated);

  let creatorId = data.creator;

  if (!creatorId) {
    creatorId = "dm";
  }

  const newCampaign = await prisma.campaign.create({
    data: {
      ...dbData,
      dm: { connect: { id: creatorId } },
      players: {
        create: { playerId: creatorId }
      }
    },
    include: {
      players: { include: { player: true } },
      characters: true
    }
  });

  return CampaignAdapter.toFrontend(newCampaign);
};
