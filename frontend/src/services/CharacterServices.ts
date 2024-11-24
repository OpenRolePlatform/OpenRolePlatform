import {
  Character,
  HpStats,
  OtherStats,
  Skills,
  Stats,
} from '../models/CharacterModels';

export async function getCharacters() {
  try {
    const response = await fetch(`/api/character/`, {
      method: 'GET',
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

export async function getCharacterStats(name: string) {
  try {
    const response = await fetch(`/api/character/${name}/stats`, {
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

export async function updateCharacterStats(name: string, newStats: Stats) {
  try {
    const response = await fetch(`/api/character/${name}/stats`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStats),
    });
    if (response.ok) {
      if (response.status === 200) return;
    } else {
      console.error('Error at character stats.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character stats.' + error);
    throw error;
  }
}

export async function getCharacterSkills(name: string) {
  try {
    const response = await fetch(`/api/character/${name}/skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error at character skills.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character skills.' + error);
    throw error;
  }
}

export async function updateCharacterSkills(name: string, newSkills: Skills) {
  try {
    const response = await fetch(`/api/character/${name}/skills`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSkills),
    });
    if (response.ok) {
      if (response.status === 200) return;
    } else {
      console.error('Error at character skills.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character skills.' + error);
    throw error;
  }
}

export async function getCharacterHp(name: string) {
  try {
    const response = await fetch(`/api/character/${name}/hp`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return response.json();
    } else {
      console.error('Error at character hp.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character hp.' + error);
    throw error;
  }
}

export async function updateCharacterHp(name: string, newHp: HpStats) {
  try {
    const response = await fetch(`/api/character/${name}/hp`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHp),
    });
    if (response.ok) {
      if (response.status === 200) return;
    } else {
      console.error('Error at character hp.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character hp.' + error);
    throw error;
  }
}

export async function getCharacterOtherStats(name: string) {
  try {
    const response = await fetch(`/api/character/${name}/other`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error at character other stats.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character other stats.' + error);
    throw error;
  }
}

export async function updateCharacterOtherStats(
  name: string,
  newOtherStats: OtherStats,
) {
  try {
    const response = await fetch(`/api/character/${name}/other`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOtherStats),
    });
    if (response.ok) {
      if (response.status === 200) return;
    } else {
      console.error('Error at character other stats.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character other stats.' + error);
    throw error;
  }
}
