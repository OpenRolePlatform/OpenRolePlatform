import axios, { AxiosError } from 'axios';
import { Character } from '../models/CharacterModels';

export async function getCharacters(
  query?: Partial<Pick<Character, 'class' | 'owner' | 'race'>>,
) {
  try {
    const params = new URLSearchParams(query);
    const response = await axios.get(`/api/character`, { params });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the characters.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function getCharacterDetails(id: string) {
  try {
    const response = await axios.get(`/api/character/${id}`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the character details.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function newCharacter(character: Character) {
  try {
    const response = await axios.post(`/api/character`, character, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error creating the new character', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function updateCharacter(
  id: string,
  character: Partial<Character>,
) {
  try {
    const response = await axios.put(`/api/character/${id}`, character, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error updating character', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}
