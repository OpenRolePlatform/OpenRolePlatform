import { useState } from 'react';
import { useGetSetState, useMount } from 'react-use';

export interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

const initStats: Stats = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

export const useCharacter = (name: string) => {
  const [stats, setStats] = useGetSetState(initStats);
  const [loading, setLoading] = useState(false);

  const getCharacterStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/characterStats/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        if (response.status === 200) return await response.json();
      } else console.error('Error at character stats.');
    } catch (error) {
      console.error('Error at character stats.' + error);
    }
    setLoading(false);
  };

  const updateCharacterStats = async (newStats: Stats) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/characterStats/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStats),
      });
      if (response.ok) {
        if (response.status === 200) setStats(newStats);
      } else console.error('Error at character stats.');
    } catch (error) {
      console.error('Error at character stats.' + error);
    }
    setLoading(false);
  };

  useMount(async () => {
    const stats = await getCharacterStats();
    setStats(stats);
  });

  /*  const fetchOtherCharacterStats = async () => {
    try {
      const userData = {
        character: localStorage.getItem('character'),
      };
      const response = await fetch(`${backendUrl}/getOtherCharacterStats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        if (response.status === 200) {
          const data = await response.json();
          const auxStats = otherCharacterStats;
          auxStats.ac = data.ac;
          auxStats.mov = data.movement;
          auxStats.bonus = data.bonus;
          setOtherCharacterStats(auxStats);
          setOtherCharacterStatsSwitch(true);
        } else {
          const updateOtherCharacterStats = async () => {
            try {
              const userData = {
                character: localStorage.getItem('character'),
                ac: 10,
                movement: 30,
                bonus: 0,
              };
              const response = await fetch(
                `${backendUrl}/putOtherCharacterStats`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
                },
              );
              if (!response.ok) {
                console.error(
                  'An unexpected error ocurred while trying to update your stats',
                );
              }
            } catch (error) {
              console.error('Error at character stats.' + error);
              alert(
                'An unexpected error ocurred while trying to update your stats',
              );
            }
          };
          updateOtherCharacterStats();
        }
      } else {
        console.error('Error at character stats.');
      }
    } catch (error) {
      console.error('Error at character stats.' + error);
      alert('An unexpected error ocurred while trying to load your stats');
    }
  };
  fetchOtherCharacterStats();
  const fetchHpStats = async () => {
    try {
      const userData = {
        character: localStorage.getItem('character'),
      };
      const response = await fetch(`${backendUrl}/getHpStats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        if (response.status === 200) {
          const data = await response.json();
          const auxStats = hp;
          auxStats.hp = data.hp;
          auxStats.hpTemp = data.hpTemp;
          auxStats.hpPool = data.hpPool;
          setHp(auxStats);
          setHpStatsSwitch(true);
        } else {
          const updateHpStats = async () => {
            try {
              const userData = {
                character: localStorage.getItem('character'),
                hp: 10,
                hpTemp: 5,
                hpPool: 0,
              };
              const response = await fetch(`${backendUrl}/putHpStats`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });
              if (!response.ok) {
                console.error(
                  'An unexpected error ocurred while trying to update your hp',
                );
              }
            } catch (error) {
              console.error('Error at character hp.' + error);
              alert(
                'An unexpected error ocurred while trying to update your hp',
              );
            }
          };
          updateHpStats();
        }
      } else {
        console.error('Error at character hp.');
      }
    } catch (error) {
      console.error('Error at character hp.' + error);
      alert('An unexpected error ocurred while trying to load your hp');
    }
  };
  fetchHpStats(); */

  return {
    stats,
    loading,
    updateCharacter: updateCharacterStats,
  };
};
