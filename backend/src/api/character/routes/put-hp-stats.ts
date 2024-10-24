import { HpStats } from "../../../core/models/hp-stats";
import hpStats from "../../../core/schemas/hpStats-schema";

export async function _putHpStats(character: string, stats: HpStats) {
  await hpStats.findOneAndUpdate(
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
