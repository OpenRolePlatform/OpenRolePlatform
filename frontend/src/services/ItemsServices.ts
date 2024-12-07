import axios, { AxiosError } from 'axios';
import { Item } from '../models/ItemsModels';

export async function getItems(query: any) {
  try {
    const params = new URLSearchParams(query);
    const response = await axios.get(`/api/items`, { params });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the items.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function getItemData(itemID: string) {
  try {
    const response = await axios.get(`/api/items/${itemID}`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the items data.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function newItem(item: Item) {
  try {
    const response = await axios.post(`/api/items`, item, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error creating new items', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function updateItem(itemID: string, item: Partial<Item>) {
  try {
    const response = await axios.put(`/api/items/${itemID}`, item, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error updating items', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}
