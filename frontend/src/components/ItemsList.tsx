import { SmileySad } from '@phosphor-icons/react';
import { Avatar, ConfigProvider, List, Skeleton, Space } from 'antd';
import { Item } from '../models/ItemsModels';
import { getBackendImage, getItemImage } from '../utils/images';

interface ItemsListProps {
  items: Array<Item> | undefined;
  actions?: (item: Item) => React.ReactNode[];
  loading: boolean;
}
const EmptyItems = () => {
  return (
    <Space direction="vertical" align="center">
      <SmileySad size={32} />
      <p>No items in the campaign</p>
    </Space>
  );
};
export default function ItemsList({ items, actions, loading }: ItemsListProps) {
  return (
    <ConfigProvider renderEmpty={EmptyItems}>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={
          items ?? [
            [
              { name: '', image: '' },
              { name: '', image: '' },
              { name: '', image: '' },
            ],
          ]
        }
        renderItem={(item) => (
          <List.Item actions={actions ? actions(item) : []}>
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    src={
                      item.image
                        ? getBackendImage(item.image)
                        : getItemImage(item.type)
                    }
                  />
                }
                title={item.name}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}
