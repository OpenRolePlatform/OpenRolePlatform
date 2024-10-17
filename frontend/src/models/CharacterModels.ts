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

export const StatsList = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export interface Skills {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  acrobatics?: number;
  animal?: number;
  arcana?: number;
  athletics?: number;
  deception?: number;
  history?: number;
  insight?: number;
  intimidation?: number;
  investigation?: number;
  medicine?: number;
  nature?: number;
  perception?: number;
  performance?: number;
  persuasion?: number;
  religion?: number;
  hand?: number;
  stealth?: number;
  survival?: number;
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
