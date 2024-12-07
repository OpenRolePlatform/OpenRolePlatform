import {
  Col,
  Descriptions,
  Flex,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import { useEffect } from 'react';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { Item } from '../../models/ItemsModels';
import { getItemData } from '../../services/ItemsServices';
import { useDynamicObject } from '../../services/useDynamicObject';

export default function ItemDetails({ id }: { id: string }) {
  const item = useDynamicObject<Item>(id, 'item', getItemData);

  useEffect(() => {
    item.refetch();
  }, [id]);

  return (
    <>
      {!item.loading ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={'1rem'}>
            <Space
              direction="vertical"
              align="start"
              style={{ height: '100%' }}
            >
              <PlayerAvatar
                role="player"
                image={item.data().image}
                name={item.data().name}
              />
            </Space>
            <Col>
              <Row align="middle" gutter={8}>
                <Col>
                  <Typography.Title level={4}>
                    <b>{item.data().name}</b>
                  </Typography.Title>
                </Col>
              </Row>
              {item.data().description}
            </Col>
          </Flex>
          <Descriptions
            items={[
              {
                key: 'creation_date',
                label: 'Creation date',
                children: new Date(item.data().creation_date!).toDateString(),
              },
              {
                key: 'type',
                label: 'Type',
                children: item.data().type.toUpperCase(),
              },
            ]}
          />
          <br />
        </Space>
      ) : (
        <>
          <Flex gap={'1rem'}>
            <Space direction="vertical" align="start">
              <SkeletonAvatar size={128}></SkeletonAvatar>
            </Space>
            <Skeleton title loading paragraph={{ rows: 4 }} />
          </Flex>
        </>
      )}
    </>
  );
}
