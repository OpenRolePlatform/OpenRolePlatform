import { HpStats } from "./hpStats-model";
import { OtherStats } from "./otherStats-model";
import { Skills } from "./skills-model";
import { Stats } from "./stats-model";

export interface Character {
  name: string;
  stats?: Stats;
  skills?: Skills;
  hp?: HpStats;
  other?: OtherStats;
}
