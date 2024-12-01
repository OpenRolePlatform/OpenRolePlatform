import { Avatar, List, Skeleton } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { DEFAULT_AVATAR } from '../../assets/Images';
import { Item } from '../../models/ItemsModels';
import { getItems } from '../../services/ItemsServices';
import { getBackendImage } from '../../utils/images';
import NewItems from './NewItems';

export default function Items() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [items, setItems] = useState<Array<Item>>([
    { name: '', description: '', type: 'accessory' },
    { name: '', description: '', type: 'accessory' },
    { name: '', description: '', type: 'accessory' },
  ]);

  useMount(async () => {
    try {
      const data = await getItems();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={items}
        renderItem={(item) => (
          <List.Item onClick={() => navigate(`/characters/${item._id}`)}>
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={
                  item.image ? (
                    <Avatar size="large" src={getBackendImage(item.image)} />
                  ) : (
                    <Avatar size="large" src={DEFAULT_AVATAR} />
                  )
                }
                title={item.name}
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <NewItems />
    </>
  );
}
