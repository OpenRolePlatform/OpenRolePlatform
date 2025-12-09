import { prisma } from "../../../connectDB";
import { PlayerAdapter } from "../../../core/adapters/player-adapter";

export const _getPlayers = async () => {
  const players = await prisma.player.findMany({
    orderBy: { name: 'asc' },
    include: {
      campaignsPlaying: { include: { campaign: true } },
      campaignsDM: true
    }
  });
  return players.map(PlayerAdapter.toFrontend);
};
