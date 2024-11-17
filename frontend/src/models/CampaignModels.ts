export interface ExampleCampaign {
  id: string;
  title: string;
  description: string;
  genre: string;
  players: number;
  maxPlayers: number;
  creator: string;
  createdAt: Date;
  status: 'active' | 'completed' | 'paused';
  image: string;
}

export interface Campaign {
  name: string;
  description: string;
  creation_date: Date;
  image: string;
}
