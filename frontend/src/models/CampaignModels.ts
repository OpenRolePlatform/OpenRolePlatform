export interface Campaign {
  id: string;
  title: string;
  description: string;
  genre: string;
  players: number;
  maxPlayers: number;
  creator: string;
  createdAt: Date;
  status: 'active' | 'completed' | 'paused';
}

export const campaignsExample: Campaign[] = [
  {
    id: '1',
    title: 'Las Sombras de Eldoria',
    description:
      'Un viaje épico a través de un mundo lleno de magia y criaturas oscuras.',
    genre: 'Fantástico',
    players: 3,
    maxPlayers: 6,
    creator: 'ElmaDark',
    createdAt: new Date('2023-09-15'),
    status: 'active',
  },
  {
    id: '2',
    title: 'Cazadores de Reliquias',
    description:
      'Explora antiguas ruinas y desentraña los secretos de civilizaciones perdidas.',
    genre: 'Aventura',
    players: 5,
    maxPlayers: 5,
    creator: 'Tiberius',
    createdAt: new Date('2023-10-01'),
    status: 'active',
  },
  {
    id: '3',
    title: 'Los Últimos Defensores',
    description:
      'Defiende el reino de una invasión inminente y descubre la traición en tu interior.',
    genre: 'Acción',
    players: 4,
    maxPlayers: 6,
    creator: 'Sara_RPG',
    createdAt: new Date('2023-08-20'),
    status: 'completed',
  },
  {
    id: '4',
    title: 'Crónicas de la Galaxia Perdida',
    description:
      'Viaja a través del espacio y enfrenta a temibles enemigos en una lucha por la supervivencia.',
    genre: 'Ciencia Ficción',
    players: 2,
    maxPlayers: 4,
    creator: 'Starlord',
    createdAt: new Date('2023-10-10'),
    status: 'paused',
  },
  {
    id: '5',
    title: 'Misterios de la Isla Encantada',
    description:
      'Descubre los secretos de una isla mágica y enfrenta criaturas fantásticas.',
    genre: 'Aventura/Fantástico',
    players: 6,
    maxPlayers: 6,
    creator: 'AdventureJoe',
    createdAt: new Date('2023-09-25'),
    status: 'active',
  },
];
