import { createContext, ReactNode, useContext, useState } from 'react';
import { useMount } from 'react-use';
import useWebSocket from 'react-use-websocket';
import { Campaign } from '../models/CampaignModels';
import { getLoadedCampaign } from '../services/CampaingServices';

interface CampaignContextType {
  campaign: Campaign | undefined;
  selectCampaign: (newCampaign: Campaign) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined,
);

interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({
  children,
}) => {
  const [campaign, setCampaign] = useState<Campaign>();

  async function load() {
    try {
      const campaignInfo = await getLoadedCampaign();
      setCampaign(campaignInfo);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useWebSocket('/ws', {
    onOpen: () => {
      console.log('WebSocket is connected');
    },
    onMessage: (event) => {
      const message = JSON.parse(event.data);
      if (message.model === 'campaign' && message.type === 'CampaignLoad') {
        setCampaign(message.data);
      }
    },
  });

  async function selectCampaign(newCampaign: Campaign) {
    setCampaign(newCampaign);
  }

  useMount(() => {
    load();
  });

  const context = {
    campaign,
    selectCampaign,
  };

  return (
    <CampaignContext.Provider value={context}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used inside a campaign context');
  }
  return context;
};
