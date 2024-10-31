import {
  Skill,
  Skills,
  SkillsSources,
  Stat,
  Stats,
} from '../models/CharacterModels';

export function getBonusValue(value?: number) {
  switch (value) {
    case 0:
      return '-5';
    case 1:
      return '-5';
    case 2:
      return '-4';
    case 3:
      return '-4';
    case 4:
      return '-3';
    case 5:
      return '-3';
    case 6:
      return '-2';
    case 7:
      return '-2';
    case 8:
      return '-1';
    case 9:
      return '-1';
    case 10:
      return '+0';
    case 11:
      return '+0';
    case 12:
      return '+1';
    case 13:
      return '+1';
    case 14:
      return '+2';
    case 15:
      return '+2';
    case 16:
      return '+3';
    case 17:
      return '+3';
    case 18:
      return '+4';
    case 19:
      return '+4';
    case 20:
      return '+5';
    default:
      return '-';
  }
}

export function getBonusValueNum(value?: number) {
  switch (value) {
    case 0:
      return -5;
    case 1:
      return -5;
    case 2:
      return -4;
    case 3:
      return -4;
    case 4:
      return -3;
    case 5:
      return -3;
    case 6:
      return -2;
    case 7:
      return -2;
    case 8:
      return -1;
    case 9:
      return -1;
    case 10:
      return 0;
    case 11:
      return 0;
    case 12:
      return 1;
    case 13:
      return 1;
    case 14:
      return 2;
    case 15:
      return 2;
    case 16:
      return 3;
    case 17:
      return 3;
    case 18:
      return 4;
    case 19:
      return 4;
    case 20:
      return 5;
    default:
      return 0;
  }
}

export function getAllBonus(stats: Stats) {
  const statsBonus: { [key in Stat]?: string } = {};
  Object.keys(stats).forEach((key: string) => {
    statsBonus[key as Stat] = getBonusValue(stats[key as Stat]);
    getBonusValue();
  });
  return statsBonus;
}

export function getAllBonusNum(stats: Stats) {
  const statsBonus: { [key in Stat]?: number } = {};
  Object.keys(stats).forEach((key: string) => {
    statsBonus[key as Stat] = getBonusValueNum(stats[key as Stat]);
    getBonusValue();
  });
  return statsBonus;
}

export function getAllSkillBonus(stats: Stats, skills: Skills, bonus: number) {
  const statsBonus = getAllBonusNum(stats);
  const skillBonus: { [key in Skill]?: number } = {};
  console.log(statsBonus);

  Object.keys(stats).forEach((stat: string) => {
    SkillsSources[stat as Stat].forEach((skill: string) => {
      console.log('Some stat');

      console.log(skill, skills[skill]);
      console.log(stat, statsBonus[stat]);

      skillBonus[skill] =
        statsBonus[stat] + (skills?.[skill] ? Number(bonus) : 0);
    });
  });
  console.log(skillBonus);

  return skillBonus;
}
