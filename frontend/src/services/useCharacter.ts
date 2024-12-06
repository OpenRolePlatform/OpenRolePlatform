import { useState } from 'react';
import { useGetSetState, useMount } from 'react-use';
import useWebSocket from 'react-use-websocket';
import {
  Character,
  HpStats,
  OtherStats,
  Skills,
  Stats,
} from '../models/CharacterModels';
import { getCharacterDetails, updateCharacter } from './CharacterServices';

const initStats: Stats = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

const initSkills: Skills = {
  strength: false,
  dexterity: false,
  constitution: false,
  intelligence: false,
  wisdom: false,
  charisma: false,
  acrobatics: false,
  animal: false,
  arcana: false,
  athletics: false,
  deception: false,
  history: false,
  insight: false,
  intimidation: false,
  investigation: false,
  medicine: false,
  nature: false,
  perception: false,
  performance: false,
  persuasion: false,
  religion: false,
  hand: false,
  stealth: false,
  survival: false,
};

const initHp: HpStats = {
  hp: 0,
  hpTemp: 0,
  hpPool: 0,
};

const initOther: OtherStats = {
  ac: 0,
  movement: 0,
  bonus: 0,
};

export interface CharacterService {
  name: string;
  character: () => Character;

  stats: () => Stats;
  skills: () => Skills;
  hp: () => HpStats;
  other: () => OtherStats;

  updateStats: (newStats: Stats) => void;
  updateSkills: (newSkills: Skills) => void;
  updateHp: (newHp: HpStats) => void;
  updateOther: (newOther: OtherStats) => void;

  loading: boolean;
  error?: string;
}

export function useCharacter(id: string): CharacterService {
  const [character, setCharacter] = useGetSetState<Character>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useWebSocket('/ws', {
    onOpen: () => {
      console.log('WebSocket is connected');
    },
    onMessage: (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      if (message.model === 'character' && message.data._id === id) {
        setCharacter(message.data);
      }
    },
  });

  // Hook start
  useMount(async () => {
    setLoading(true);
    try {
      const character = await getCharacterDetails(id);
      setCharacter(character);
      setLoading(false);
    } catch (_error) {
      console.log(_error);
      setError(JSON.stringify(_error));
    }
  });

  // Function to get a character with all his data

  const _updateCharacter = async (newCharacter: Partial<Character>) => {
    setLoading(true);
    try {
      await updateCharacter(id, newCharacter);
      setCharacter(newCharacter);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    // Main
    name: character().name,
    character,

    // Getters
    stats: () => character().stats ?? initStats,
    skills: () => character().skills ?? initSkills,
    hp: () => character().hp ?? initHp,
    other: () => character().other ?? initOther,

    // Setters
    updateStats: async (stats: Stats) =>
      await _updateCharacter({ stats: { ...character().stats, ...stats } }),
    updateSkills: async (skills: Skills) =>
      await _updateCharacter({ skills: { ...character().skills, ...skills } }),
    updateHp: async (hp: HpStats) =>
      await _updateCharacter({ hp: { ...character().hp, ...hp } }),
    updateOther: async (other: OtherStats) =>
      await _updateCharacter({ other: { ...character().other, ...other } }),

    // State info
    loading,
    error,
  };
}
