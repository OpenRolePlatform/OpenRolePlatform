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
import PlayersList from '../../components/PlayersList';
import { Campaign } from '../../models/CampaignModels';
import { Player } from '../../models/PlayerModels';
import {
  getCampaignData,
  getCampaignPlayers,
} from '../../services/CampaignServices';
import { useDynamicList } from '../../services/useDynamicList';
import { useDynamicObject } from '../../services/useDynamicObject';
import { getBackendImage } from '../../utils/images';

export default function CampaignDetails({ id }: { id: string }) {
  const campaign = useDynamicObject<Campaign>(id, 'campaign', getCampaignData);
  const players = useDynamicList<Player>('player', id, getCampaignPlayers);

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
      {!campaign.loading ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={'1rem'}>
            <Space
              direction="vertical"
              align="start"
              style={{ height: '100%' }}
            >
              <img
                className="campaign-logo"
                src={getBackendImage(campaign.data().image)}
                alt="logo"
              />
            </Space>
            <Space direction="vertical">
              <Typography.Title level={4}>
                <b>{campaign.data.name}</b>
              </Typography.Title>
              {campaign.data().description}
            </Space>
          </Flex>
          <Descriptions
            items={[
              {
                key: 'creation_date',
                label: 'Creation date',
                children: new Date(
                  campaign.data().creation_date,
                ).toDateString(),
              },
              {
                key: 'status',
                label: 'Status',
                children: (
                  <Tag color={getStatus(campaign.data().status)}>
                    {campaign.data().status}
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
            onChange={(key) => {
              if (key.length > 0) players.refetch();
            }}
            items={[
              {
                key: '1',
                label: 'Players',
                children: (
                  <PlayersList
                    players={players.data}
                    loading={players.loading}
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
