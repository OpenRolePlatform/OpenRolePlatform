import { User } from '@phosphor-icons/react';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Flex,
  Image,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MasterIcon } from '../assets/Icons';
import { CAMPAIGN_ICON, mainLogo } from '../assets/Images';
import { useCampaign } from '../components/CampaignContext';
import { usePlayer } from '../components/PlayerContext';
import PlayersList from '../components/PlayersList';
import { Player } from '../models/PlayerModels';
import { enrollCampaign, getPlayers } from '../services/PlayerServices';
import { useDynamicList } from '../services/useDynamicList';
import { getBackendImage } from '../utils/images';
import NewPlayer from './NewPlayer';

export default function MainPage() {
  const navigate = useNavigate();
  const playerContext = usePlayer();
  const campaignContext = useCampaign();

  const players = useDynamicList<Player>('player', getPlayers);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (campaignContext.campaign) {
      if (playerContext.role === 'dm') navigate('/characters');
      else if (
        playerContext.role === 'player' &&
        campaignContext.campaign()?.players.includes(playerContext.player?._id)
      )
        navigate('/characters');
    }
  });

  return (
    <>
      {/* tile, image and sub-title */}
      <Flex vertical justify="center" align="center">
        <img className="logo" src={mainLogo} alt="logo" />
        <Title>
          {playerContext.role === 'dm' && (
            <>
              Hi <b>Master</b>
              <br />
            </>
          )}
          {playerContext.role === 'player' && (
            <>
              Hi <b>{playerContext.player?.name}</b>
              <br />
            </>
          )}
          Welcome to
          <i>
            <b> OpenRolePlatform!</b>
          </i>
        </Title>
        {/* No role content */}
        {!playerContext.role && (
          <Space direction="vertical" style={{ width: '80%' }}>
            <Divider />
            <Button
              shape="round"
              size="large"
              block
              type="primary"
              icon={MasterIcon}
              onClick={() => playerContext.selectDM()}
            >
              Enter as Dungeon Master
            </Button>
            <Divider>or</Divider>
            <Button
              icon={<User />}
              onClick={() => setShowDrawer(true)}
              shape="round"
              size="large"
              block
              type="text"
              variant="filled"
            >
              Enter as Player
            </Button>
          </Space>
        )}
        {/* DM content */}
        {playerContext.role === 'dm' && (
          <>
            <Space direction="vertical">
              <Button
                shape="round"
                size="large"
                block
                type="primary"
                onClick={() => navigate('/campaigns')}
              >
                Select a campaign to start playing
              </Button>
            </Space>
          </>
        )}
        {/* Player content */}
        {playerContext.role === 'player' && (
          <>
            {/* Campaign loaded or not content */}
            {campaignContext.campaign ? (
              <Space
                direction="vertical"
                align="center"
                style={{ width: '80%' }}
              >
                <Divider />
                <Row gutter={8}>
                  <Col xs={{ flex: '150px' }} sm={{ flex: '150px' }}>
                    <Image
                      className="campaign-logo"
                      src={getBackendImage(campaignContext.campaign()?.image!)}
                      fallback={CAMPAIGN_ICON}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <Typography.Title level={4}>
                      <b>{campaignContext.campaign.name}</b>
                    </Typography.Title>
                    {campaignContext.campaign()?.description}
                  </Col>
                </Row>

                <Col>
                  <Button
                    shape="round"
                    size="large"
                    block
                    type="primary"
                    onClick={() =>
                      enrollCampaign(
                        playerContext.player?._id,
                        campaignContext.campaign()?._id,
                      )
                    }
                  >
                    Enroll Campaign
                  </Button>
                  <Divider>or</Divider>
                  <Button
                    icon={<User />}
                    onClick={() => setShowDrawer(true)}
                    shape="round"
                    size="large"
                    block
                    type="text"
                    variant="filled"
                  >
                    Change to other Player
                  </Button>
                </Col>
              </Space>
            ) : (
              <Space
                direction="vertical"
                align="center"
                style={{ width: '80%' }}
              >
                <Typography.Title level={4}>
                  Wait for the DM to load the campaign
                </Typography.Title>
              </Space>
            )}
          </>
        )}
        <Drawer
          placement="bottom"
          size="large"
          title="Select player"
          open={showDrawer}
          extra={<NewPlayer players={players.data} />}
          onClose={() => setShowDrawer(false)}
        >
          <PlayersList
            players={players.data}
            actions={(player) => [
              <>
                {playerContext.player?._id !== player._id ? (
                  <Button
                    onClick={() => {
                      playerContext.selectPlayer(player);
                      setShowDrawer(false);
                    }}
                  >
                    Select Player
                  </Button>
                ) : (
                  <Tag color="success">It's you!</Tag>
                )}
              </>,
            ]}
            loading={players.loading}
          />
        </Drawer>
      </Flex>
    </>
  );
}
