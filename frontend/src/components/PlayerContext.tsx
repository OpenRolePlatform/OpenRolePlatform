import { createContext, ReactNode, useContext, useState } from 'react';
import { useMount } from 'react-use';
import { Player } from '../models/PlayerModels';
import { getPlayerDetails } from '../services/PlayerServices';

type Role = 'player' | 'dm';
interface PlayerContextType {
  player: Player | undefined;
  selectPlayer: (newPlayer: Player) => void;
  role: Role | undefined;
  selectDM: () => void;
  logout: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [player, setPlayer] = useState<Player>();
  const [role, setRole] = useState<Role>();

  function selectPlayer(newPlayer: Player) {
    if (role === 'dm') deleteDM();
    setPlayer(newPlayer);
    setRole('player');
    localStorage.setItem('player', newPlayer._id);
  }

  function selectDM() {
    if (role === 'player') deletePlayer();
    setRole('dm');
    localStorage.setItem('role', 'dm');
  }

  function deletePlayer() {
    setPlayer(undefined);
    setRole(undefined);
    localStorage.removeItem('player');
  }

  function deleteDM() {
    setRole(undefined);
    localStorage.removeItem('role');
  }

  async function load() {
    // get the role that was doing
    const currentRole = localStorage.getItem('role');
    // select DM role
    if (currentRole === 'dm') selectDM();
    // select Player role
    else if (currentRole === 'player') {
      const savedPlayer = localStorage.getItem('player');
      if (savedPlayer) {
        try {
          const playerInfo = await getPlayerDetails(savedPlayer);
          selectPlayer(playerInfo);
        } catch (error) {
          console.error(error);
        }
      }
    } else deletePlayer();
  }

  function logout() {
    if (role === 'dm') deleteDM();
    else deletePlayer();
  }

  useMount(() => {
    load();
  });

  const context = {
    player,
    selectPlayer,
    role,
    selectDM,
    logout,
  };

  return (
    <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used inside a player context');
  }
  return context;
};
