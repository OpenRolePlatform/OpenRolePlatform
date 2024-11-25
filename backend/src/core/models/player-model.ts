import { Campaign } from "./campaign/campaign-model";

export interface Player {
  name: string;
  description?: string;
  image?: string;
  campaigns: {
    playing: Array<Campaign>;
    dm: Array<Campaign>;
  };
}
