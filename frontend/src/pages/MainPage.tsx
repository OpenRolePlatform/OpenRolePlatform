import { Button, Divider, Flex, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MasterIcon } from '../assets/Icons';
import { mainLogo } from '../assets/Images';
import { useCampaign } from '../components/CampaignContext';
import { usePlayer } from '../components/PlayerContext';
import { enrollCampaign } from '../services/PlayerServices';
import { getBackendImage } from '../utils/images';
import Players from './Players';

export default function MainPage() {
  const navigate = useNavigate();
  const playerContext = usePlayer();
  const campaignContext = useCampaign();

  useEffect(() => {
    if (campaignContext.campaign) {
      if (playerContext.role === 'dm') navigate('/characters');
      else if (
        playerContext.role === 'player' &&
        campaignContext.campaign.players.includes(playerContext.player?._id)
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
            <Players />
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

                <Flex gap={'1rem'}>
                  <Space
                    direction="vertical"
                    align="start"
                    style={{ height: '100%' }}
                  >
                    <img
                      className="campaign-logo"
                      src={getBackendImage(campaignContext.campaign.image)}
                      alt="logo"
                    />
                  </Space>
                  <Space direction="vertical">
                    <Typography.Title level={4}>
                      <b>{campaignContext.campaign.name}</b>
                    </Typography.Title>
                    {campaignContext.campaign.description}
                  </Space>
                </Flex>

                <br />
                <Space direction="vertical" align="center">
                  <Button
                    shape="round"
                    size="large"
                    block
                    type="primary"
                    onClick={() =>
                      enrollCampaign(
                        playerContext.player?._id,
                        campaignContext.campaign?._id,
                      )
                    }
                  >
                    Enroll Campaign
                  </Button>
                  <Divider>or</Divider>
                  <Players />
                </Space>
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
      </Flex>
    </>
  );
}
