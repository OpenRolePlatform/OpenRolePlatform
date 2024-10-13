import { Stats } from "./models/character";
import characterStats from "./schemas/characterStats-schema";

export async function updateCharacterStats(character: string, stats: Stats) {
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
