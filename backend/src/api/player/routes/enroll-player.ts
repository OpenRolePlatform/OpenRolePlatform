import { prisma } from "../../../connectDB";
import { CampaignAdapter } from "../../../core/adapters/campaign-adapter";
import { PlayerAdapter } from "../../../core/adapters/player-adapter";

export const _enrollPlayers = async (campaignId: string, playerIds: string[]) => {
  await prisma.$transaction(
    playerIds.map(pid =>
      prisma.playersOnCampaigns.upsert({
        where: { playerId_campaignId: { campaignId, playerId: pid } },
        create: { campaignId, playerId: pid },
        update: {}
      })
    )
  );

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      players: { include: { player: true } },
      characters: true
    }
  });

  const players = await prisma.player.findMany({
    where: { id: { in: playerIds } },
    include: {
      campaignsPlaying: { include: { campaign: true } },
      campaignsDM: true,
      characters: true
    }
  });

  if (!campaign) return [null, null];

  return [
    players.map(PlayerAdapter.toFrontend),
    CampaignAdapter.toFrontend(campaign)
  ];
};
