import { Campaign } from './CampaignModels';

export interface Player {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  campaigns: {
    playing: Array<Campaign>;
    dm: Array<Campaign>;
  };
}
