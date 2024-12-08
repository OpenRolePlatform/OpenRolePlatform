import axios, { AxiosError } from 'axios';

export async function getNotes(owner: string) {
  try {
    const response = await axios.get(`/api/notes/${owner}`);
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error getting the notes.', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}

export async function updateNotes(owner: string, text: string) {
  try {
    console.log(text);
    const payload = { text: text };
    const response = await axios.put(`/api/notes/${owner}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
      console.error('Error updating the notes', error.response);
      throw new Error(error.response?.statusText);
    }
    console.error(error);
    throw error;
  }
}
