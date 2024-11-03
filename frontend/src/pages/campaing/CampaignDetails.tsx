import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Avatar, Card, Col, List, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
import { campaignsExample } from '../../models/CampaignModels';
const BREAKPOINTS = { mobile: 0, tablet: 576, desktop: 1280 };

export default function CampaignDetails() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <>
      {breakpoint === 'mobile' ? (
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={campaignsExample}
          renderItem={(campaign) => (
            <List.Item onClick={() => navigate(`/campaigns/${campaign.title}`)}>
              <List.Item.Meta
                avatar={
                  campaign.image ? (
                    <Avatar size="large" src={campaign.image} />
                  ) : (
                    <Avatar size="large" icon={<MenuBookIcon />} />
                  )
                }
                title={campaign.title}
              />
            </List.Item>
          )}
        />
      ) : (
        <Row align="middle" gutter={[12, 12]}>
          {campaignsExample.map((campaign, index) => (
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
                onClick={() => navigate(`/campaigns/${campaign.title}`)}
              >
                <h3>{campaign.title}</h3>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
