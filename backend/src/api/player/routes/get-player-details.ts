import { prisma } from "../../../connectDB";
import { PlayerAdapter } from "../../../core/adapters/player-adapter";

export const _getPlayerDetails = async (id: string) => {
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      campaignsPlaying: {
        include: {
          campaign: {
            include: { players: { include: { player: true } }, characters: true }
          }
        }
      },
      campaignsDM: {
        include: { players: { include: { player: true } }, characters: true }
      },
      characters: true
    }
  });

  if (!player) return null;
  return PlayerAdapter.toFrontend(player);
};
