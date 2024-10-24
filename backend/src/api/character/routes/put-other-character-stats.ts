import { OtherStats } from "../../../core/models/other-stats";
import otherCharacterStats from "../../../core/schemas/otherCharacterStats-schema";

export async function _putOtherCharacterStats(
  character: string,
  stats: OtherStats
) {
  await otherCharacterStats.findOneAndUpdate(
    {
      character: character,
    },
    {
      ...stats,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
