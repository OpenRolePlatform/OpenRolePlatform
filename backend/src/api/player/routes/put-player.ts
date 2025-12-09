import { prisma } from "../../../connectDB";
import { PlayerAdapter } from "../../../core/adapters/player-adapter";
import { PlayerInputSchema } from "../../../core/validation/zod-schemas";

export const _putPlayer = async (id: string, data: any) => {
  const validated = PlayerInputSchema.partial().parse(data);

  const existing = await prisma.player.findUnique({ where: { id } });
  if (!existing) return null;

  const dbData = PlayerAdapter.toDatabase(validated as any);

  const updatedPlayer = await prisma.player.update({
    where: { id },
    data: dbData,
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

  // @ts-ignore
  return PlayerAdapter.toFrontend(updatedPlayer);
};
