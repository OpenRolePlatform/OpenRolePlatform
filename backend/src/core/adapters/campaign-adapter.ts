import { Campaign, PlayersOnCampaigns, Player, Character } from '@prisma/client';
import { CampaignInput } from '../validation/zod-schemas';

type CampaignWithRelations = Campaign & {
  players?: (PlayersOnCampaigns & { player: Player })[];
  characters?: Character[];
};

export const CampaignAdapter = {
  toFrontend: (campaign: CampaignWithRelations) => {
    return {
      _id: campaign.id,
      name: campaign.name,
      description: campaign.description || "",
      image: campaign.image || "",
      status: (campaign.status as 'active' | 'completed' | 'paused') || 'active',
      creation_date: campaign.creationDate,

      players: campaign.players?.map(p => ({
        _id: p.player.id,
        name: p.player.name,
        image: p.player.image || "",
        description: p.player.description || "",
        campaigns: { playing: [], dm: [] }
      })) || [],

      characters: campaign.characters?.map(c => c.id) || []
    };
  },

  toDatabase: (input: CampaignInput) => {
    return {
      name: input.name,
      description: input.description,
      image: input.image,
      status: input.status,
    };
  }
};
