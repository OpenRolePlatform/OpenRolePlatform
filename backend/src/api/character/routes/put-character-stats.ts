import { Stats } from "../../../core/models/stats-model";
import characterStats from "../../../core/schemas/character/characterStats-schema";

export async function _putCharacterStats(
  campaign: string,
  character: string,
  stats: Stats
) {
  await characterStats.findOneAndUpdate(
    {
      campaign: campaign,
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
