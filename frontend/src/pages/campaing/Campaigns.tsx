import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Avatar, Button, Card, Col, List, message, Row, Skeleton } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import useBreakpoint from 'use-breakpoint';
import { Campaign } from '../../models/CampaignModels';
import { getCampaigns, selectCampaign } from '../../services/CampaingServices';
import { getBackendImage } from '../../utils/images';
import NewCampaign from './NewCampaign';
const BREAKPOINTS = { mobile: 0, tablet: 576, desktop: 1280 };

export default function CampaignDetails() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [loading, setLoading] = useState<boolean>(true);

  const [campaigns, setCampaigns] = useState<Array<Campaign>>([
    { name: '', description: '', image: '', creation_date: new Date() },
    { name: '', description: '', image: '', creation_date: new Date() },
    { name: '', description: '', image: '', creation_date: new Date() },
  ]);

  useMount(async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const loadCampaign = async (name: string) => {
    try {
      await selectCampaign(name);
      message.success('Campaign loaded');
      navigate('/characters');
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <>
      {breakpoint === 'mobile' ? (
        <List
          //loading={loading}
          itemLayout="horizontal"
          size="large"
          dataSource={campaigns}
          renderItem={(campaign) => (
            <List.Item
              onClick={() => navigate(`/campaigns/${campaign.name}`)}
              actions={[
                <Button
                  variant="filled"
                  onClick={() => loadCampaign(campaign.name)}
                >
                  Load Campaign
                </Button>,
              ]}
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  avatar={
                    campaign.image ? (
                      <Avatar
                        size="large"
                        src={getBackendImage(campaign.image)}
                      />
                    ) : (
                      <Avatar size="large" icon={<MenuBookIcon />} />
                    )
                  }
                  title={campaign.name}
                  description={campaign.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      ) : (
        <Row align="stretch" gutter={[12, 12]}>
          {campaigns.map((campaign, index) => (
            <Col
              key={`col-${index}`}
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '33%' }}
              lg={{ flex: '20%' }}
              xl={{ flex: '20%' }}
            >
              {loading ? (
                <Card
                  style={{ height: '100%' }}
                  cover={<Skeleton.Node style={{ width: '100%' }} active />}
                  onClick={() => navigate(`/campaigns/${campaign.name}`)}
                >
                  <Skeleton.Input style={{ width: '100%' }} active />
                </Card>
              ) : (
                <Card
                  style={{ height: '100%' }}
                  cover={
                    campaign.image ? (
                      <img
                        /*  style={{ maxHeight: 300 }} */
                        src={getBackendImage(campaign.image)}
                      />
                    ) : (
                      <MenuBookIcon style={{ height: '100%' }} />
                    )
                  }
                  onClick={() => navigate(`/campaigns/${campaign.name}`)}
                >
                  <h3>{campaign.name}</h3>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      )}

      <NewCampaign />
    </>
  );
}
