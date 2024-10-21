import { useState } from 'react';
import { useGetSetState, useMount } from 'react-use';
import {
  Character,
  HpStats,
  OtherStats,
  Skills,
  Stats,
} from '../models/CharacterModels';
import {
  getCharacterHp,
  getCharacterOtherStats,
  getCharacterSkills,
  getCharacterStats,
  updateCharacterHp,
  updateCharacterOtherStats,
  updateCharacterSkills,
  updateCharacterStats,
} from './CharacterServices';

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

const initOtherStats: OtherStats = {
  ac: 0,
  movement: 0,
  bonus: 0,
};

export interface CharacterService {
  name: string;
  character: () => Character;

  stats: () => Stats;
  skillsStats: () => Skills;
  hpStats: () => HpStats;
  otherStats: () => OtherStats;

  updateStats: (newStats: Stats) => void;
  updateSkills: (newSkills: Skills) => void;
  updateHp: (newHp: HpStats) => void;
  updateOther: (newOther: OtherStats) => void;

  loading: boolean;
  error?: string;
}

export function useCharacter(name: string): CharacterService {
  const [stats, setStats] = useGetSetState(initStats);
  const [skillsStats, setSkillsStats] = useGetSetState(initSkills);
  const [hpStats, setHpStats] = useGetSetState(initHp);
  const [otherStats, setOtherStats] = useGetSetState(initOtherStats);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // Hook start
  useMount(async () => {
    setLoading(true);
    try {
      const stats = await getCharacterStats(name);
      setStats(stats);
      const skills = await getCharacterSkills(name);
      setSkillsStats(skills);
      const other = await getCharacterOtherStats(name);
      setOtherStats(other);
      const hp = await getCharacterHp(name);
      setHpStats(hp);
      setLoading(false);
    } catch (_error) {
      console.log(_error);
      setError(JSON.stringify(_error));
    }
  });

  // Function to get a character with all his data
  const getCharacter = () => {
    return {
      name,
      stats: stats(),
      skills: skillsStats(),
      hp: hpStats(),
      other: otherStats(),
    };
  };

  const _updateStats = async (stats: Stats) => {
    setLoading(true);
    try {
      await updateCharacterStats(name, stats);
      setStats(stats);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const _updateSkills = async (skills: Skills) => {
    setLoading(true);
    try {
      await updateCharacterSkills(name, skills);
      setSkillsStats(skills);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const _updateHp = async (hp: HpStats) => {
    setLoading(true);
    try {
      await updateCharacterHp(name, hp);
      setHpStats(hp);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const _updateOther = async (other: OtherStats) => {
    setLoading(true);
    try {
      await updateCharacterOtherStats(name, other);
      setOtherStats(other);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    // Main
    name,
    character: getCharacter,
    // Getters
    stats,
    skillsStats,
    hpStats,
    otherStats,
    // Setters
    updateStats: _updateStats,
    updateHp: _updateHp,
    updateSkills: _updateSkills,
    updateOther: _updateOther,
    // State info
    loading,
    error,
  };
}
