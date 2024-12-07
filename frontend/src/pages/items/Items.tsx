import ItemsList from '../../components/ItemsList';
import { Item } from '../../models/ItemsModels';
import { getItems } from '../../services/ItemsServices';
import { useDynamicList } from '../../services/useDynamicList';
import NewItems from './NewItems';

export default function Items() {
  const items = useDynamicList<Item>('item', getItems);

  return (
    <>
      <ItemsList items={items.data} loading={items.loading} />
      <NewItems />
    </>
  );
}
