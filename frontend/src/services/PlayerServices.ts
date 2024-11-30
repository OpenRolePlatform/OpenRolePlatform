export async function getPlayers() {
  try {
    const response = await fetch(`/api/player`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error getting the campaigns.');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error at character stats.' + error);
    throw error;
  }
}

export async function getPlayerDetails(id: string) {
  try {
    const response = await fetch(`/api/player/${id}`, {
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

export async function newPlayer(player: FormData) {
  try {
    const response = await fetch(`/api/player`, {
      method: 'POST',
      body: player,
    });
    if (response.ok) {
      if (response.status === 200) return await response.json();
    } else {
      console.error('Error creating the new player');
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
