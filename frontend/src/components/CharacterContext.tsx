import { createContext, ReactNode, useContext, useState } from 'react';
import { useGetSet, useGetSetState, useMount } from 'react-use';
import {
  Character,
  HpStats,
  OtherStats,
  Skills,
  Stats,
} from '../models/CharacterModels';
import {
  getCharacterDetails,
  updateCharacter,
} from '../services/CharacterServices';
import { useDynamicObject } from '../services/useDynamicObject';

interface CharacterContextType {
  character: () => Character;

  stats: () => Stats | undefined;
  skills: () => Skills | undefined;
  hp: () => HpStats | undefined;
  other: () => OtherStats | undefined;

  updateStats: (newStats: Stats) => void;
  updateSkills: (newSkills: Skills) => void;
  updateHp: (newHp: HpStats) => void;
  updateOther: (newOther: OtherStats) => void;

  loading: boolean;
  refetch: () => void;
  selectCharacter: (id: string) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined,
);

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [id, setID] = useGetSet<string>('');

  const [character, selectCharacterObject] = useGetSetState(
    useDynamicObject<Character>(id(), 'character', getCharacterDetails),
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  function selectCharacter(id: string) {
    localStorage.setItem('character', id);
    setID(id);
    selectCharacterObject(
      useDynamicObject<Character>(id, 'character', getCharacterDetails),
    );
  }

  async function load() {
    // get the role that was doing
    const characterID = localStorage.getItem('character');
    if (characterID) {
      selectCharacter(characterID);
    }
  }

  useMount(() => {
    load();
  });

  const _updateCharacter = async (newCharacter: Partial<Character>) => {
    setLoading(true);
    try {
      await updateCharacter(id(), newCharacter);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const context = {
    character: character().data,

    // Getters
    stats: () => character().data().stats,
    skills: () => character().data().skills,
    hp: () => character().data().hp,
    other: () => character().data().other,

    // Setters
    updateStats: async (stats: Stats) =>
      await _updateCharacter({
        stats: { ...character().data().stats, ...stats },
      }),
    updateSkills: async (skills: Skills) =>
      await _updateCharacter({
        skills: { ...character().data().skills, ...skills },
      }),
    updateHp: async (hp: HpStats) =>
      await _updateCharacter({ hp: { ...character().data().hp, ...hp } }),
    updateOther: async (other: OtherStats) =>
      await _updateCharacter({
        other: { ...character().data().other, ...other },
      }),

    refetch: character().refetch,
    loading: character().loading,
    selectCharacter,
  };

  return (
    <CharacterContext.Provider value={context}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useSelectedCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      'useSelectedCharacter must be used inside a campaign context',
    );
  }
  return context;
};
