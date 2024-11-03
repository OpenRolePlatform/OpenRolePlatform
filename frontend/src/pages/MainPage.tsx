import { Button, Divider, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { mainLogo } from '../assets/Images';

export default function MainPage() {
  const navigate = useNavigate();

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
        <Button
          shape="round"
          size="large"
          block
          type="primary"
          onClick={() => navigate('/dm')}
        >
          Enter as Dungeon Master
        </Button>
      </Flex>
    </>
  );
}
