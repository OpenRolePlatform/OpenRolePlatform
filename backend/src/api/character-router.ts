import characterSkills from "../core/schemas/characterSkills-schema";
import hpStats from "../core/schemas/hpStats-schema";
import otherCharacterStats from "../core/schemas/otherCharacterStats-schema";
import { _getCharacterStats } from "./routers/get-character-stats";
import { _putCharacterStats } from "./routers/put-character-stats";

export const putCharacterStats = async (req: any, res: any) => {
  const { character, ...stats } = req.body;
  try {
    await _putCharacterStats(character, stats);
    res.status(200).send("Stats updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the character stats.");
    res
      .status(500)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const getCharacterStats = async (req: any, res: any) => {
  const { character } = req.query;
  try {
    const stats = await _getCharacterStats(character);
    if (stats !== undefined && stats !== null) {
      return res.status(200).json({
        character: stats.character,
        strength: stats.strength,
        dexterity: stats.dexterity,
        constitution: stats.constitution,
        intelligence: stats.intelligence,
        wisdom: stats.wisdom,
        charisma: stats.charisma,
      });
    } else {
      return res.status(204).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to update the character stats.");
    res
      .status(500)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const putOtherCharacterStats = async (req: any, res: any) => {
  const { character, ac, movement, bonus } = req.body;
  try {
    await otherCharacterStats.findOneAndUpdate(
      {
        character: character,
      },
      {
        character: character,
        ac: ac,
        movement: movement,
        bonus: bonus,
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(200).send("Other stats updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the character other stats.");
    res
      .status(500)
      .send(
        "Error while trying to update the character other stats." +
          error.message
      );
  }
};

export const getOtherCharacterStats = async (req: any, res: any) => {
  const { character } = req.body;
  try {
    const stats = await otherCharacterStats.findOne({
      character: character,
    });
    if (stats) {
      return res.status(200).json({
        character: stats.character,
        ac: stats.ac,
        movement: stats.movement,
        bonus: stats.bonus,
      });
    } else {
      return res.status(204).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to get the character other stats.");
    res
      .status(500)
      .send(
        "Error while trying to get the character other stats." + error.message
      );
  }
};

export const putHpStats = async (req: any, res: any) => {
  const { character, hp, hpTemp, hpPool } = req.body;
  try {
    await hpStats.findOneAndUpdate(
      {
        character: character,
      },
      {
        hp: hp,
        hpTemp: hpTemp,
        hpPool: hpPool,
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(200).send("HP updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the HP.");
    res
      .status(500)
      .send("Error while trying to update the HP." + error.message);
  }
};

export const getHpStats = async (req: any, res: any) => {
  const { character } = req.body;
  try {
    const stats = await hpStats.findOne({
      character: character,
    });
    if (stats) {
      return res.status(200).json({
        character: stats.character,
        hp: stats.hp,
        hpTemp: stats.hpTemp,
        hpPool: stats.hpPool,
      });
    } else {
      return res.status(204).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to get the character hp.");
    res
      .status(500)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const putSkillsStats = async (req: any, res: any) => {
  const {
    character,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    acrobatics,
    animal,
    arcana,
    athletics,
    deception,
    history,
    insight,
    intimidation,
    investigation,
    medicine,
    nature,
    perception,
    performance,
    persuasion,
    religion,
    hand,
    stealth,
    survival,
  } = req.body;
  try {
    await characterSkills.findOneAndUpdate(
      {
        character: character,
      },
      {
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        acrobatics,
        animal,
        arcana,
        athletics,
        deception,
        history,
        insight,
        intimidation,
        investigation,
        medicine,
        nature,
        perception,
        performance,
        persuasion,
        religion,
        hand,
        stealth,
        survival,
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(200).send("Skills updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the skills.");
    res
      .status(500)
      .send("Error while trying to update the skils." + error.message);
  }
};

export const getSkillsStats = async (req: any, res: any) => {
  const { character } = req.body;
  try {
    const stats = await characterSkills.findOne({
      character: character,
    });
    if (stats) {
      return res.status(200).json({
        character: stats.character,
        strength: stats.strength,
        dexterity: stats.dexterity,
        constitution: stats.constitution,
        intelligence: stats.intelligence,
        wisdom: stats.wisdom,
        charisma: stats.charisma,
        acrobatics: stats.acrobatics,
        animal: stats.animal,
        arcana: stats.arcana,
        athletics: stats.athletics,
        deception: stats.deception,
        history: stats.history,
        insight: stats.insight,
        intimidation: stats.intimidation,
        investigation: stats.investigation,
        medicine: stats.medicine,
        nature: stats.nature,
        perception: stats.perception,
        performance: stats.performance,
        persuasion: stats.persuasion,
        religion: stats.religion,
        hand: stats.hand,
        stealth: stats.stealth,
        survival: stats.survival,
      });
    } else {
      return res.status(204).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to get the character skills.");
    res
      .status(500)
      .send(
        "Error while trying to update the character skills." + error.message
      );
  }
};
