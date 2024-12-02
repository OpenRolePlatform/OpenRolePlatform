import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import ItemsList from '../../components/ItemsList';
import { Item } from '../../models/ItemsModels';
import { getItems } from '../../services/ItemsServices';
import NewItems from './NewItems';

export default function Items() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [items, setItems] = useState<Array<Item>>();

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
      <ItemsList items={items} loading={loading} />
      <NewItems />
    </>
  );
}
