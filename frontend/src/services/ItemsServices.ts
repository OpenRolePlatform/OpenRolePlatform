import { Item } from '../models/ItemsModels';

export async function getItems() {
  try {
    const response = await fetch(`/api/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error getting the items.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error getting the items.' + error);
    throw error;
  }
}

export async function getItemData() {
  try {
    const response = await fetch(`/api/items/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error at character stats.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character stats.' + error);
    throw error;
  }
}

export async function newItem(item: Array<Item>) {
  try {
    const response = await fetch(`/api/items`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error creating the new campaign');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function bulkItemsCreate(items: FormData) {
  try {
    const response = await fetch(`/api/items`, {
      method: 'POST',
      body: items,
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error creating the new campaign');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateItem(itemID: string, item: FormData) {
  try {
    const response = await fetch(`/api/items/${itemID}`, {
      method: 'PUT',
      body: item,
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error creating the new campaign');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
