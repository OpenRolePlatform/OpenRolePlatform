import { OtherStats } from "../../../core/models/otherStats-model";
import otherCharacterStats from "../../../core/schemas/character/characterOtherStats-schema";

export async function _putCharacterOtherStats(
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
