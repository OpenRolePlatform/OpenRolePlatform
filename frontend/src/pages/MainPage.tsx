import { Button, Divider, Flex, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MasterIcon } from '../assets/Icons';
import { mainLogo } from '../assets/Images';
import { usePlayer } from '../components/PlayerContext';
import Players from './Players';

export default function MainPage() {
  const navigate = useNavigate();
  const player = usePlayer();

  useEffect(() => {
    if (player.role === 'dm') {
      navigate('/campaigns');
    } else if (player.role === 'player') navigate('/characters');
  });

  return (
    <>
      {/* tile, image and sub-title */}
      <Flex vertical justify="center" align="center">
        <img className="logo" src={mainLogo} alt="logo" />
        <Title>
          Welcome to
          <i>
            <b> OpenRolePlatform</b>
          </i>
        </Title>

        <Divider />
        <Space direction="vertical">
          <Button
            shape="round"
            size="large"
            block
            type="primary"
            icon={MasterIcon}
            onClick={() => player.selectDM()}
          >
            Enter as Dungeon Master
          </Button>
          <Divider>or</Divider>
          <Players />
        </Space>
      </Flex>
    </>
  );
}
