import {
  Collapse,
  Descriptions,
  Flex,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
import { BREAKPOINTS } from '../../components/Layout';
import PlayersList from '../../components/PlayersList';
import { Campaign } from '../../models/CampaignModels';
import { Player } from '../../models/PlayerModels';
import {
  getCampaignData,
  getCampaignPlayers,
} from '../../services/CampaignServices';
import { getBackendImage } from '../../utils/images';

export default function CampaignDetails({ id }: { id: string }) {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [campaign, setCampaign] = useState<Campaign>();
  const [players, setPlayers] = useState<Array<Player>>();

  const [loadingPlayers, setLoadingPlayers] = useState<boolean>(false);

  async function loadPlayers() {
    setLoadingPlayers(true);
    try {
      const playersData = await getCampaignPlayers(id);
      setPlayers(playersData);
    } catch (error) {
      console.log(error);
    }
    setLoadingPlayers(false);
  }

  async function loadCampaignDetails() {
    try {
      const data = await getCampaignData(id);
      setCampaign(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCampaignDetails();
  }, [id]);

  function getStatus(status: string) {
    switch (status) {
      case 'active':
        return 'blue';
      case 'completed':
        return 'success';
      case 'paused':
        return 'warning';
    }
    return 'default';
  }

  return (
    <>
      {campaign ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={'1rem'}>
            <Space
              direction="vertical"
              align="start"
              style={{ height: '100%' }}
            >
              <img
                className="campaign-logo"
                src={getBackendImage(campaign.image)}
                alt="logo"
              />
            </Space>
            <Space direction="vertical">
              <Typography.Title level={4}>
                <b>{campaign.name}</b>
              </Typography.Title>
              {campaign.description}
            </Space>
          </Flex>
          <Descriptions
            items={[
              {
                key: 'creation_date',
                label: 'Creation date',
                children: new Date(campaign.creation_date).toDateString(),
              },
              {
                key: 'status',
                label: 'Status',
                children: (
                  <Tag color={getStatus(campaign.status)}>
                    {campaign.status}
                  </Tag>
                ),
              },
            ]}
          />
          <br />
          <Collapse
            style={{ width: '100%' }}
            size="large"
            collapsible="header"
            onChange={() => {
              if (!players) loadPlayers();
            }}
            items={[
              {
                key: '1',
                label: 'Players',
                children: (
                  <PlayersList players={players} loading={loadingPlayers} />
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
