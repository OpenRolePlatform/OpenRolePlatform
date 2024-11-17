import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Avatar, Card, Col, List, Row } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import useBreakpoint from 'use-breakpoint';
import { Campaign } from '../../models/CampaignModels';
import { getCampaigns } from '../../services/CampaingServices';
const BREAKPOINTS = { mobile: 0, tablet: 576, desktop: 1280 };

export default function CampaignDetails() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);

  useMount(async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      {breakpoint === 'mobile' ? (
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={campaigns}
          renderItem={(campaign) => (
            <List.Item onClick={() => navigate(`/campaigns/${campaign.name}`)}>
              <List.Item.Meta
                avatar={
                  campaign.image ? (
                    <Avatar size="large" src={campaign.image} />
                  ) : (
                    <Avatar size="large" icon={<MenuBookIcon />} />
                  )
                }
                title={campaign.name}
                description={campaign.description}
              />
            </List.Item>
          )}
        />
      ) : (
        <Row align="middle" gutter={[12, 12]}>
          {campaigns.map((campaign, index) => (
            <Col
              key={`col-${index}`}
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '33%' }}
              lg={{ flex: '20%' }}
              xl={{ flex: '20%' }}
            >
              <Card
                cover={
                  campaign.image ? (
                    <img src={campaign.image} />
                  ) : (
                    <MenuBookIcon />
                  )
                }
                onClick={() => navigate(`/campaigns/${campaign.name}`)}
              >
                <h3>{campaign.name}</h3>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
