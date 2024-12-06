import {
  Collapse,
  Descriptions,
  Flex,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import { useEffect, useState } from 'react';
import CampaignsList from '../../components/CampaignsList';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { Campaign } from '../../models/CampaignModels';
import { Player } from '../../models/PlayerModels';
import {
  getPlayerCampaigns,
  getPlayerDetails,
} from '../../services/PlayerServices';

export default function PlayerDetails({ id }: { id: string }) {
  const [player, setPlayer] = useState<Player>();
  const [campaigns, setCampaigns] = useState<Array<Campaign>>();

  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);

  async function loadCampaigns() {
    setLoadingCampaigns(true);
    try {
      const campaignsData = await getPlayerCampaigns(id);
      setCampaigns(campaignsData);
    } catch (error) {
      console.log(error);
    }
    setLoadingCampaigns(false);
  }

  async function loadPlayerDetails() {
    try {
      const data = await getPlayerDetails(id);
      setPlayer(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadPlayerDetails();
  }, [id]);

  return (
    <>
      {player ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={'1rem'}>
            <Space
              direction="vertical"
              align="start"
              style={{ height: '100%' }}
            >
              <PlayerAvatar
                role="player"
                image={player.image}
                name={player.name}
              />
            </Space>
            <Space direction="vertical">
              <Typography.Title level={4}>
                <b>{player.name}</b>
              </Typography.Title>
              {player.description}
            </Space>
          </Flex>
          <Descriptions
            items={[
              {
                key: 'creation_date',
                label: 'Creation date',
                children: new Date(player.creation_date).toDateString(),
              },
            ]}
          />
          <br />
          <Collapse
            style={{ width: '100%' }}
            size="large"
            collapsible="header"
            onChange={() => {
              if (!campaigns) loadCampaigns();
            }}
            items={[
              {
                key: '1',
                label: 'Enrolled Campaigns',
                children: (
                  <CampaignsList
                    campaigns={campaigns}
                    loading={loadingCampaigns}
                  />
                ),
              },
            ]}
          />
        </Space>
      ) : (
        <>
          <Flex gap={'1rem'}>
            <Space direction="vertical" align="start">
              <SkeletonAvatar size={128}></SkeletonAvatar>
            </Space>
            <Skeleton title loading paragraph={{ rows: 4 }} />
          </Flex>
        </>
      )}
    </>
  );
}
