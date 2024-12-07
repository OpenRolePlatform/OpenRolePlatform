import { List, SmileySad } from '@phosphor-icons/react';
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Drawer,
  Flex,
  Image,
  message,
  Row,
  Skeleton,
  Space,
  Tag,
} from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';
import { CAMPAIGN_ICON } from '../../assets/Images';
import { useCampaign } from '../../components/CampaignContext';
import CampaignsList from '../../components/CampaignsList';
import { BREAKPOINTS } from '../../components/Layout';
import { usePlayer } from '../../components/PlayerContext';
import { Campaign } from '../../models/CampaignModels';
import { getCampaigns, selectCampaign } from '../../services/CampaignServices';
import { useDynamicList } from '../../services/useDynamicList';
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

export default function Campaigns() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const campaignContext = useCampaign();
  const playerContext = usePlayer();

  const campaigns = useDynamicList<Campaign>('campaign', getCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<string>();

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
            <CampaignsList
              campaigns={campaigns.data}
              loading={campaigns.loading}
              extra={(campaign) => (
                <Flex style={{ width: '100%' }} justify="end">
                  <Button
                    icon={<List size={32} weight="bold" />}
                    onClick={() => setSelectedCampaign(campaign._id)}
                  />
                </Flex>
              )}
            />
          ) : (
            <Row align="stretch" gutter={[12, 12]}>
              {campaigns.data.map((campaign, index) => (
                <Col
                  key={`col-${index}`}
                  xs={{ flex: '100%' }}
                  sm={{ flex: '50%' }}
                  md={{ flex: '33%' }}
                  lg={{ flex: '20%' }}
                  xl={{ flex: '20%' }}
                >
                  {campaigns.loading ? (
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
                        <>
                          <Image
                            src={getBackendImage(campaign.image!)}
                            fallback={CAMPAIGN_ICON}
                            preview={false}
                          />
                        </>
                      }
                      onClick={() => setSelectedCampaign(campaign._id)}
                    >
                      <h3>{campaign.name}</h3>
                      {campaignContext.campaign?._id === campaign._id && (
                        <Tag color="success">Loaded Campaign</Tag>
                      )}
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
          <>
            {campaignContext.campaign?._id !== selectedCampaign ? (
              playerContext.role === 'dm' && (
                <Button
                  variant="filled"
                  onClick={() => loadCampaign(selectedCampaign)}
                >
                  Load Campaign
                </Button>
              )
            ) : (
              <Tag color="success">Loaded Campaign</Tag>
            )}
          </>
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
