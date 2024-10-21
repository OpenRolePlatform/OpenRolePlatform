export type Stat =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export interface Stats {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

export type StatsBonus = {
  [key in Stat]?: string;
};

export const StatsList = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export interface Skills {
  strength?: boolean;
  dexterity?: boolean;
  constitution?: boolean;
  intelligence?: boolean;
  wisdom?: boolean;
  charisma?: boolean;
  acrobatics?: boolean;
  animal?: boolean;
  arcana?: boolean;
  athletics?: boolean;
  deception?: boolean;
  history?: boolean;
  insight?: boolean;
  intimidation?: boolean;
  investigation?: boolean;
  medicine?: boolean;
  nature?: boolean;
  perception?: boolean;
  performance?: boolean;
  persuasion?: boolean;
  religion?: boolean;
  hand?: boolean;
  stealth?: boolean;
  survival?: boolean;
}

export interface HpStats {
  hp?: number;
  hpTemp?: number;
  hpPool?: number;
}

export interface OtherStats {
  ac?: number;
  movement?: number;
  bonus?: number;
}

export interface Character {
  name: string;
  stats: Stats;
  skills: Skills;
  hp: HpStats;
  other: OtherStats;
}
