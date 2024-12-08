import axios, { AxiosError } from 'axios';
import { Player } from '../models/PlayerModels';

export async function getPlayers() {
  try {
    const response = await axios.get(`/api/player`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the players.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function getPlayerDetails(id: string) {
  try {
    const response = await axios.get(`/api/player/${id}`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the player details.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function getPlayerCampaigns(id: string) {
  try {
    const response = await axios.get(`/api/player/${id}/campaigns`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the player campaigns.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function newPlayer(player: Player) {
  try {
    const response = await axios.post(`/api/player`, player, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error creating new player', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function enrollCampaign(player: string, campaign: string) {
  try {
    const response = await axios.put(
      `/api/player/${player}/enroll/${campaign}`,
    );
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error enrolling a campaign.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}
