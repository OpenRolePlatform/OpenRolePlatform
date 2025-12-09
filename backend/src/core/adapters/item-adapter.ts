import { Item, InventoryItem } from '@prisma/client';
import { ItemInput } from '../validation/zod-schemas';

export const ItemAdapter = {
  toFrontend: (entity: Item | (InventoryItem & { item: Item })) => {
    let item: Item;
    let instanceData: any = {};

    if ('item' in entity) {
      item = entity.item;
      instanceData = {
        instanceId: entity.id,
        equipped: entity.equipped,
        amount: entity.amount,
      };
    } else {
      item = entity;
    }

    const systemData = (item.systemData && typeof item.systemData === 'object')
      ? item.systemData
      : {};

    return {
      _id: item.id,
      name: item.name,
      description: item.description || "",
      type: item.type,
      image: item.image || "",
      ...systemData,
      ...instanceData
    } as ItemInput;
  },

  // Frontend -> BD
  toDatabase: (input: ItemInput) => {
    const safeInput = input as any;

    const {
      name, description, type, image,
      _id, instanceId,
      equipped, amount,
      ...rest
    } = safeInput;

    return {
      meta: {
        name,
        description: description || null,
        type,
        image: image || null
      },
      systemData: {
        ...rest
      }
    };
  }
};
