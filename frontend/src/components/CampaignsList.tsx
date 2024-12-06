import { BookOpenText, SmileySad } from '@phosphor-icons/react';
import { Avatar, ConfigProvider, List, Skeleton, Space } from 'antd';
import { Campaign } from '../models/CampaignModels';
import { getBackendImage } from '../utils/images';

interface CampaignsListProps {
  campaigns: Array<Campaign> | undefined;
  actions?: (campaign: Campaign) => React.ReactNode[];
  loading: boolean;
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
}: CampaignsListProps) {
  return (
    <ConfigProvider renderEmpty={EmptyCampaigns}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={
          campaigns ?? [
            [
              { name: '', image: '' },
              { name: '', image: '' },
              { name: '', image: '' },
            ],
          ]
        }
        renderItem={(campaign) => (
          <>
            <List.Item
              actions={actions ? actions(campaign) : []}
              /* extra={
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
              } */
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
          </>
        )}
      />
    </ConfigProvider>
  );
}
