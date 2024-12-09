import { BookOpenText, SmileySad } from '@phosphor-icons/react';
import { Avatar, ConfigProvider, List, Skeleton, Space, Tag } from 'antd';
import { Campaign } from '../models/CampaignModels';
import { getBackendImage } from '../utils/images';
import { useCampaign } from './CampaignContext';

interface CampaignsListProps {
  campaigns: Array<Campaign> | undefined;
  actions?: (campaign: Campaign) => React.ReactNode[];
  loading: boolean;
  extra?: (campaign: Campaign) => React.ReactNode;
}
const EmptyCampaigns = () => {
  return (
    <Space direction="vertical" align="center">
      <SmileySad size={32} />
      <p>No campaigns created</p>
      <p>Create a new campaign to start playing!!</p>
    </Space>
  );
};
export default function CampaignsList({
  campaigns,
  actions,
  loading,
  extra,
}: CampaignsListProps) {
  const campaignContext = useCampaign();

  return (
    <ConfigProvider renderEmpty={EmptyCampaigns}>
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        dataSource={campaigns}
        renderItem={(campaign) => (
          <>
            <List.Item
              actions={actions && !loading ? actions(campaign) : []}
              extra={extra && !loading ? extra(campaign) : []}
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
                  description={
                    campaignContext.campaign()?._id === campaign._id && (
                      <Tag color="success">Loaded Campaign</Tag>
                    )
                  }
                />
                {campaign.description}
              </Skeleton>
            </List.Item>
          </>
        )}
      />
    </ConfigProvider>
  );
}
