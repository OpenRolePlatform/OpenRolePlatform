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

// export async function newItem(item: Item) {
//   try {
//     const response = await axios.post(`/api/items`, item, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error: unknown | AxiosError) {
//     if (error instanceof AxiosError) {
//       console.error('Error creating new items', error.response);
//       throw new Error(error.response?.statusText);
//     }
//     console.error(error);
//     throw error;
//   }
// }

export async function updateNotes(owner: string, text: string) {
  try {
    const response = await axios.put(`/api/notes/${owner}`, text, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
