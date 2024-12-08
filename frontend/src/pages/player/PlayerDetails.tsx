import {
  Col,
  Collapse,
  Descriptions,
  Flex,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import { useEffect } from 'react';
import CampaignsList from '../../components/CampaignsList';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { usePlayer } from '../../components/PlayerContext';
import { Campaign } from '../../models/CampaignModels';
import { Player } from '../../models/PlayerModels';
import {
  getPlayerCampaigns,
  getPlayerDetails,
} from '../../services/PlayerServices';
import { useDynamicList } from '../../services/useDynamicList';
import { useDynamicObject } from '../../services/useDynamicObject';

export default function PlayerDetails({ id }: { id: string }) {
  const playerContext = usePlayer();

  const player = useDynamicObject<Player>(id, 'player', getPlayerDetails);
  const campaigns = useDynamicList<Campaign>(
    'campaign',
    getPlayerCampaigns,
    id,
  );

  useEffect(() => {
    if (id) {
      player.refetch(id);
    }
  }, [id]);

  return (
    <>
      {!player.loading ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={'1rem'}>
            <Space
              direction="vertical"
              align="start"
              style={{ height: '100%' }}
            >
              <PlayerAvatar
                role="player"
                image={player.data().image}
                name={player.data().name}
              />
            </Space>
            <Col>
              <Row align="middle" gutter={8}>
                <Col>
                  <Typography.Title level={4}>
                    <b>{player.data().name}</b>
                  </Typography.Title>
                </Col>
                <Col>
                  {playerContext?.player?._id === id && (
                    <Tag color="success">It's you!</Tag>
                  )}
                </Col>
              </Row>
              {player.data().description}
            </Col>
          </Flex>
          <Descriptions
            items={[
              {
                key: 'creation_date',
                label: 'Creation date',
                children: new Date(player.data().creation_date!).toDateString(),
              },
            ]}
          />
          <br />
          <Collapse
            style={{ width: '100%' }}
            size="large"
            collapsible="header"
            onChange={(key) => {
              if (key.length > 0) campaigns.refetch();
            }}
            items={[
              {
                key: '1',
                label: 'Enrolled Campaigns',
                children: (
                  <CampaignsList
                    campaigns={campaigns.data}
                    loading={campaigns.loading}
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
