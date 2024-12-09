import { message } from 'antd';
import { createContext, ReactNode, useContext } from 'react';
import { useGetSetState, useMount } from 'react-use';
import useWebSocket from 'react-use-websocket';
import { Campaign } from '../models/CampaignModels';
import {
  getLoadedCampaign,
  selectCampaign,
} from '../services/CampaignServices';

interface CampaignContextType {
  campaign:()=> Campaign | undefined;
  loadCampaign: (id: string) => void;
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
  const [campaign, setCampaign] = useGetSetState<Campaign>();

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
      if (message.model === 'campaign') {
        if (message.type === 'CampaignLoad') {
          setCampaign(message.data);
        } else if (
          message.type === 'Update' &&
          message.data._id === campaign?._id
        ) {
          setCampaign(message.data);
        }
      }
    },
  });

  async function loadCampaign(id: string) {
    try {
      await selectCampaign(id);
      message.success('Campaign loaded');
    } catch (error: any) {
      message.error(error.message);
    }
  }

  useMount(() => {
    load();
  });

  const context = {
    campaign,
    loadCampaign,
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
