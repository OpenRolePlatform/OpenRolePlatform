import { Stats } from "../../core/models/character";
import characterStats from "../../core/schemas/characterStats-schema";

export async function _putCharacterStats(character: string, stats: Stats) {
  await characterStats.findOneAndUpdate(
    {
      character: character,
    },
    {
      character: character,
      ...stats,
    },
    {
      upsert: true,
      new: true,
    }
  );
}
