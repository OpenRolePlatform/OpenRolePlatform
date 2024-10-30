import { HpStats } from "../../../core/models/character/hpStats-model";
import hpStats from "../../../core/schemas/character/characterHpStats-schema";

export async function _putCharacterHpStats(character: string, stats: HpStats) {
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
