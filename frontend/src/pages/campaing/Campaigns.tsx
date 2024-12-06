import { BookOpenText, SmileySad } from '@phosphor-icons/react';
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Drawer,
  Flex,
  List,
  message,
  Row,
  Skeleton,
  Space,
} from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import useBreakpoint from 'use-breakpoint';
import { BREAKPOINTS } from '../../components/Layout';
import { Campaign } from '../../models/CampaignModels';
import { getCampaigns, selectCampaign } from '../../services/CampaignServices';
import { getBackendImage } from '../../utils/images';
import CampaignDetails from './CampaignDetails';
import NewCampaign from './NewCampaign';

const EmptyCampaigns = () => {
  return (
    <Space direction="vertical" align="center">
      <SmileySad size={32} />
      <p>No campaigns created</p>
      <p>Create a new campaign to start playing!!</p>
    </Space>
  );
};

export default function CampaignsList() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedCampaign, setSelectedCampaign] = useState<string>();

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
      setCampaigns([]);
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
      <ErrorBoundary>
        <ConfigProvider renderEmpty={EmptyCampaigns}>
          {breakpoint === 'mobile' ? (
            <List
              itemLayout="horizontal"
              size="large"
              dataSource={campaigns}
              renderItem={(campaign) => (
                <List.Item
                  extra={
                    loading
                      ? []
                      : [
                          <Flex style={{ width: '100%' }} justify="end">
                            <Button
                              variant="filled"
                              onClick={() => loadCampaign(campaign._id)}
                            >
                              Load Campaign
                            </Button>
                          </Flex>,
                        ]
                  }
                >
                  <Skeleton loading={loading} title={false} active avatar>
                    <List.Item.Meta
                      avatar={
                        campaign.image ? (
                          <Avatar
                            size="large"
                            src={getBackendImage(campaign.image)}
                          />
                        ) : (
                          <Avatar
                            size="large"
                            icon={<BookOpenText weight="duotone" />}
                          />
                        )
                      }
                      title={campaign.name}
                    />
                    {campaign.description}
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
                    >
                      <Skeleton.Input style={{ width: '100%' }} active />
                    </Card>
                  ) : (
                    <Card
                      hoverable
                      style={{ height: '100%' }}
                      cover={
                        campaign.image ? (
                          <img
                            /*  style={{ maxHeight: 300 }} */
                            src={getBackendImage(campaign.image)}
                          />
                        ) : (
                          <BookOpenText
                            weight="duotone"
                            style={{ height: '100%' }}
                          />
                        )
                      }
                      onClick={() => setSelectedCampaign(campaign._id)}
                    >
                      <h3>{campaign.name}</h3>
                    </Card>
                  )}
                </Col>
              ))}
            </Row>
          )}
        </ConfigProvider>
      </ErrorBoundary>
      <Drawer
        placement="bottom"
        size="large"
        open={selectedCampaign !== undefined}
        onClose={() => setSelectedCampaign(undefined)}
        extra={
          <Button
            variant="filled"
            onClick={() => loadCampaign(selectedCampaign)}
          >
            Load Campaign
          </Button>
        }
      >
        {selectedCampaign && (
          <CampaignDetails id={selectedCampaign}></CampaignDetails>
        )}
      </Drawer>
      <NewCampaign />
    </>
  );
}
