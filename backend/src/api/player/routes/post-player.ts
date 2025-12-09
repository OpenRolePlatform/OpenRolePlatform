import { prisma } from "../../../connectDB";
import { PlayerAdapter } from "../../../core/adapters/player-adapter";
import { PlayerInputSchema } from "../../../core/validation/zod-schemas";

export const _postPlayer = async (data: any) => {
  const validated = PlayerInputSchema.parse(data);

  const dbData = PlayerAdapter.toDatabase(validated);

  const newPlayer = await prisma.player.create({
    data: {
      ...dbData,
    }
  });

  return PlayerAdapter.toFrontend(newPlayer);
};
