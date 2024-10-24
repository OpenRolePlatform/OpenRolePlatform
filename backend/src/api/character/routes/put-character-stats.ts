import { Stats } from "../../../core/models/stats-model";
import characterStats from "../../../core/schemas/character/characterStats-schema";

export async function _putCharacterStats(character: string, stats: Stats) {
  await characterStats.findOneAndUpdate(
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
