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

    console.log('selectPlayer called with:', newPlayer);

    if (role === 'dm') deleteDM();
    setPlayer(newPlayer);
    setRole('player');
    localStorage.setItem('role', 'player');
    localStorage.setItem('player', newPlayer._id);
  }

  function selectDM() {

    console.log('selectDM called');

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

    console.log('load() - currentRole from localStorage:', currentRole);

    // select DM role
    if (currentRole === 'dm') 
    {

      console.log('Selecting DM role');
      
      selectDM();
    }
      // select Player role
    else if (currentRole === 'player') {
      const savedPlayer = localStorage.getItem('player');

      console.log('Found savedPlayer ID:', savedPlayer);

      if (savedPlayer) {
        try {
          const playerInfo = await getPlayerDetails(savedPlayer);

          console.log('Player info loaded:', playerInfo);

          selectPlayer(playerInfo);
        } catch (error) {
          console.error(error);
        }
      }
    } else deletePlayer();
  }

  function logout() {

    console.log('logout called, current role:', role);
    
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
