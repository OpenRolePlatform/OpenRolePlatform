import { HpStats } from "../../../core/models/hpStats-model";
import hpStats from "../../../core/schemas/character/characterHpStats-schema";

export async function _putCharacterHpStats(
  campaign: string,
  character: string,
  stats: HpStats
) {
  await hpStats.findOneAndUpdate(
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
