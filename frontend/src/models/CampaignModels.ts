import { Player } from './PlayerModels';

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
  _id?: string;
  name: string;
  description: string;
  creation_date: Date;
  image?: string;
  status: 'active' | 'completed' | 'paused';
  players: Array<string> | Array<Player>;
}
