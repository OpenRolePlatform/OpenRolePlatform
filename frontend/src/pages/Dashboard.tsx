import { Button, Divider, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

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

        <Button onClick={() => navigate('/campaigns')}>
          Select a campaign
        </Button>
        <Button onClick={() => navigate('/campaigns/new')}>
          Create New Campaign
        </Button>
      </Flex>
    </>
  );
}
