import axios, { AxiosError } from 'axios';
import { Campaign } from '../models/CampaignModels';

export async function getCampaigns() {
  try {
    const response = await axios.get(`/api/campaign`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the campaigns.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function getCampaignData(id: string) {
  try {
    const response = await axios.get(`/api/campaign/${id}`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the campaign data.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function getCampaignPlayers(id: string) {
  try {
    const response = await axios.get(`/api/campaign/${id}/players`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the campaign players.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function newCampaign(campaign: Campaign) {
  try {
    const response = await axios.post(`/api/campaign`, campaign, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error creating a new campaign', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function selectCampaign(name: string) {
  try {
    const response = await axios.post(`/api/campaign/${name}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error loading the campaign', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function getLoadedCampaign() {
  try {
    const response = await axios.get(`/api/campaign/loaded`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the loaded campaign.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}
