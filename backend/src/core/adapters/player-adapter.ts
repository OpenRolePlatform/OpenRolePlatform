import { Player, PlayersOnCampaigns, Campaign, Character } from '@prisma/client';
import { PlayerInput } from '../validation/zod-schemas';
import { CampaignAdapter } from './campaign-adapter';

type PlayerWithRelations = Player & {
  campaignsPlaying?: (PlayersOnCampaigns & { campaign: Campaign })[];
  campaignsDM?: Campaign[];
  characters?: Character[];
};

export const PlayerAdapter = {
  toFrontend: (player: PlayerWithRelations) => {
    return {
      _id: player.id,
      name: player.name,
      description: player.description || "",
      image: player.image || "",
      creation_date: player.creationDate,

      campaigns: {
        playing: player.campaignsPlaying?.map(pc =>
          CampaignAdapter.toFrontend(pc.campaign)
        ) || [],

        dm: player.campaignsDM?.map(c =>
          CampaignAdapter.toFrontend(c)
        ) || []
      }
    };
  },

  toDatabase: (input: PlayerInput) => {
    return {
      name: input.name,
      description: input.description,
      image: input.image,
    };
  }
};
