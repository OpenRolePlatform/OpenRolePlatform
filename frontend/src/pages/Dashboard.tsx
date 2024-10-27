import { Button, Divider, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

const MockCampaigns = [name];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      {/* tile, image and sub-title */}
      <Flex vertical justify="center" align="center">
        <Title>
          Welcome to <i>OpenRolePlatform</i>
        </Title>

        <Divider />
        <Button onClick={() => navigate('/dm')}>Enter as Dungeon Master</Button>
      </Flex>
    </>
  );
}
