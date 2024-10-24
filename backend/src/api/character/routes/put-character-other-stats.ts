import { OtherStats } from "../../../core/models/otherStats-model";
import characterOtherStats from "../../../core/schemas/character/characterOtherStats-schema";

export async function _putCharacterOtherStats(
  campaign: string,
  character: string,
  stats: OtherStats
) {
  await characterOtherStats.findOneAndUpdate(
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
