import { Character } from '../models/CharacterModels';

export async function getCharacters(
  query?: Partial<Pick<Character, 'class' | 'owner' | 'race'>>,
) {
  try {
    const response = await fetch(
      `/api/character?` + new URLSearchParams(query).toString(),
      {
        method: 'GET',
      },
    );
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

export async function getCharacter(id: string) {
  try {
    const response = await fetch(`/api/character/${id}`, {
      method: 'GET',
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error at get character.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error get character.' + error);
    throw error;
  }
}

export async function newCharacter(character: FormData) {
  try {
    const response = await fetch(`/api/character`, {
      method: 'POST',
      body: character,
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error creating the new character');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCharacter(
  id: string,
  character: Partial<Character>,
) {
  try {
    const response = await fetch(`/api/character/${id}`, {
      method: 'PUT',
      body: JSON.stringify(character),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error creating the new character');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
