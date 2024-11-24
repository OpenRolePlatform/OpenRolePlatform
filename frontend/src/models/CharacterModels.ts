export type Stat =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type Skill =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'
  | 'acrobatics'
  | 'animal'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'hand'
  | 'stealth'
  | 'survival';

export type StatsBonus = {
  [key in Stat]?: string;
};

export type SkillBonus = {
  [key in Skill]?: number;
};

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

export const SkillsSources = {
  strength: ['strength', 'athletics'],
  dexterity: ['dexterity', 'acrobatics', 'hand'],
  constitution: ['constitution'],
  intelligence: [
    'intelligence',
    'arcana',
    'history',
    'investigation',
    'nature',
    'religion',
  ],
  wisdom: ['wisdom', 'animal', 'insight', 'medicine', 'perception', 'survival'],
  charisma: [
    'charisma',
    'deception',
    'intimidation',
    'performance',
    'persuasion',
  ],
};

export interface HpStats {
  hp?: number;
  hpTemp?: number;
  hpPool?: number;
}

export interface OtherStats {
  ac?: number; // Clase de armadura
  movement?: number; // Movimiento
  bonus?: number; // Bonificación
}

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

export interface Character {
  _id?: string;
  name: string;
  owner: string;
  stats?: Stats;
  hp?: HpStats;
  other?: OtherStats;
  skills?: Skills;
  class?: string;
  race?: string;
  level?: number;
  background?: string;
  creator?: string;
  createdAt?: Date;
  image?: string;
}

export const charactersExamples: Character[] = [
  {
    id: '1',
    name: 'raven',
    class: 'Guerrero',
    race: 'Elfo',
    level: 5,
    stats: {
      strength: 18,
      constitution: 16,
      dexterity: 12,
    },
    hp: {
      hp: 40,
      hpTemp: 5,
      hpPool: 45,
    },
    other: {
      ac: 16,
      movement: 25,
      bonus: 2,
    },
    skills: {
      strength: true,
      constitution: true,
      intimidation: true,
      athletics: true,
    },
    background: 'Rey en el exilio, busca recuperar su hogar.',
    creator: 'ElmaDark',
    createdAt: new Date('2023-09-15'),
    image: '/img/characters/raven.jpeg',
  },
  {
    id: '2',
    name: 'Lyra Windrider',
    class: 'Exploradora',
    race: 'Elfa',
    level: 4,
    stats: {
      dexterity: 17,
      intelligence: 14,
    },
    hp: {
      hp: 30,
      hpTemp: 0,
      hpPool: 30,
    },
    other: {
      ac: 14,
      movement: 30,
      bonus: 1,
    },
    skills: {
      dexterity: true,
      acrobatics: true,
      stealth: true,
      survival: true,
    },
    background: 'Una aventurera con un pasado misterioso.',
    creator: 'Tiberius',
    createdAt: new Date('2023-10-01'),
    image: '/img/characters/aalis.jpeg',
  },
  {
    id: '3',
    name: 'Morgath el Sabio',
    class: 'Mago',
    race: 'Humano',
    level: 6,
    stats: {
      intelligence: 20,
      wisdom: 15,
    },
    hp: {
      hp: 25,
      hpTemp: 0,
      hpPool: 25,
    },
    other: {
      ac: 12,
      movement: 30,
      bonus: 0,
    },
    skills: {
      intelligence: true,
      arcana: true,
      history: true,
      insight: true,
    },
    background: 'Un erudito que busca el conocimiento antiguo.',
    creator: 'Sara_RPG',
    createdAt: new Date('2023-08-20'),
    image: '/img/characters/amadeus.jpeg',
  },
  {
    id: '4',
    name: 'Ragnar el Bestia',
    class: 'fighter',
    race: 'Medio-orco',
    level: 7,
    stats: {
      strength: 19,
      constitution: 17,
    },
    hp: {
      hp: 50,
      hpTemp: 10,
      hpPool: 60,
    },
    other: {
      ac: 14,
      movement: 30,
      bonus: 1,
    },
    skills: {
      strength: true,
      constitution: true,
      intimidation: true,
      survival: true,
    },
    background: 'Un guerrero feroz que busca redención.',
    creator: 'Starlord',
    createdAt: new Date('2023-10-10'),
    image: '/img/characters/ozymandias.png',
  },
  {
    id: '5',
    name: 'Elara Nightshade',
    class: 'warlock',
    race: 'Medio-elfa',
    level: 3,
    stats: {
      dexterity: 16,
      charisma: 14,
    },
    hp: {
      hp: 28,
      hpTemp: 0,
      hpPool: 28,
    },
    other: {
      ac: 15,
      movement: 30,
      bonus: 2,
    },
    skills: {
      dexterity: true,
      stealth: true,
      deception: true,
      acrobatics: true,
    },
    background: 'Una maestra del sigilo con un oscuro pasado.',
    creator: 'AdventureJoe',
    createdAt: new Date('2023-09-25'),
  },
];

export const examples = [
  {
    name: 'raven',
    stats: {
      strength: 18,
      constitution: 16,
      dexterity: 12,
    },
    hp: {
      hp: 40,
      hpTemp: 5,
      hpPool: 45,
    },
    other: {
      ac: 16,
      movement: 25,
      bonus: 2,
    },
    skills: {
      strength: true,
      constitution: true,
      intimidation: true,
      athletics: true,
    },
    creator: 'ElmaDark',
    createdAt: new Date('2023-09-15'),
    image: '/img/characters/raven.jpeg',
  },
  {
    name: 'Lyra Windrider',
    stats: {
      dexterity: 17,
      intelligence: 14,
    },
    hp: {
      hp: 30,
      hpTemp: 0,
      hpPool: 30,
    },
    other: {
      ac: 14,
      movement: 30,
      bonus: 1,
    },
    skills: {
      dexterity: true,
      acrobatics: true,
      stealth: true,
      survival: true,
    },

    creator: 'Tiberius',
    createdAt: new Date('2023-10-01'),
    image: '/img/characters/aalis.jpeg',
  },
  {
    name: 'Morgath el Sabio',

    stats: {
      intelligence: 20,
      wisdom: 15,
    },
    hp: {
      hp: 25,
      hpTemp: 0,
      hpPool: 25,
    },
    other: {
      ac: 12,
      movement: 30,
      bonus: 0,
    },
    skills: {
      intelligence: true,
      arcana: true,
      history: true,
      insight: true,
    },

    creator: 'Sara_RPG',
    createdAt: new Date('2023-08-20'),
    image: '/img/characters/amadeus.jpeg',
  },
  {
    name: 'Ragnar el Bestia',

    stats: {
      strength: 19,
      constitution: 17,
    },
    hp: {
      hp: 50,
      hpTemp: 10,
      hpPool: 60,
    },
    other: {
      ac: 14,
      movement: 30,
      bonus: 1,
    },
    skills: {
      strength: true,
      constitution: true,
      intimidation: true,
      survival: true,
    },

    creator: 'Starlord',
    createdAt: new Date('2023-10-10'),
    image: '/img/characters/ozymandias.png',
  },
  {
    name: 'Elara Nightshade',

    stats: {
      dexterity: 16,
      charisma: 14,
    },
    hp: {
      hp: 28,
      hpTemp: 0,
      hpPool: 28,
    },
    other: {
      ac: 15,
      movement: 30,
      bonus: 2,
    },
    skills: {
      dexterity: true,
      stealth: true,
      deception: true,
      acrobatics: true,
    },

    creator: 'AdventureJoe',
    createdAt: new Date('2023-09-25'),
  },
];
