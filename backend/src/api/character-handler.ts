import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../WebSocketServices";
import { _getCharacter, _putCharacter } from "./routers/get-character";
import { _getCharacterStats } from "./routers/get-character-stats";
import { _getHpStats } from "./routers/get-hp-stats";
import { _getOtherCharacterStats } from "./routers/get-other-character-stats";
import { _getSkillsStats } from "./routers/get-skills-stats";
import { _putCharacterStats } from "./routers/put-character-stats";
import { _putHpStats } from "./routers/put-hp-stats";
import { _putOtherCharacterStats } from "./routers/put-other-character-stats";
import { _putSkillsStats } from "./routers/put-skills-stats";

//get methods
export const getCharacter = async (req: any, res: any) => {
  try {
    const character = await _getCharacter(req.params.characterID);
    if (character) {
      return res.status(StatusCodes.OK).send(character);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to update the character stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const getCharacterStats = async (req: any, res: any) => {
  try {
    const stats = await _getCharacterStats(req.params.characterID);
    if (stats) {
      return res.status(StatusCodes.OK).send(stats);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to update the character stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const getOtherCharacterStats = async (req: any, res: any) => {
  try {
    const stats = await _getOtherCharacterStats(req.params.characterID);
    if (stats) {
      return res.status(StatusCodes.OK).send(stats);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to get the character other stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to get the character other stats." + error.message
      );
  }
};

export const getHpStats = async (req: any, res: any) => {
  try {
    const stats = await _getHpStats(req.params.characterID);
    if (stats) {
      return res.status(StatusCodes.OK).send(stats);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to get the character hp.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const getSkillsStats = async (req: any, res: any) => {
  try {
    const stats = await _getSkillsStats(req.params.characterID);
    if (stats) {
      return res.status(StatusCodes.OK).send(stats);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to get the character skills.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the character skills." + error.message
      );
  }
};

//put methods
export const putCharacter = async (req: any, res: any) => {
  try {
    await _putCharacter(req.params.characterID, req.body);
    res.status(StatusCodes.OK).send("Stats updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the character stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const putCharacterStats = async (req: any, res: any) => {
  try {
    await _putCharacterStats(req.params.characterID, req.body);
    res.status(StatusCodes.OK).send("Stats updated correctly.");
    WebSocketService.Instance.broadcast({
      character: req.params.characterID,
      stats: req.body,
    });
  } catch (error) {
    console.error("Error while trying to update the character stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the character stats." + error.message
      );
  }
};

export const putOtherCharacterStats = async (req: any, res: any) => {
  try {
    await _putOtherCharacterStats(req.params.characterID, req.body);
    res.status(StatusCodes.OK).send("Other stats updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the character other stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the character other stats." +
          error.message
      );
  }
};

export const putHpStats = async (req: any, res: any) => {
  try {
    await _putHpStats(req.params.characterID, req.body);
    res.status(StatusCodes.OK).send("HP updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the HP.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the HP." + error.message);
  }
};

export const putSkillsStats = async (req: any, res: any) => {
  try {
    await _putSkillsStats(req.params.characterID, req.body);
    res.status(StatusCodes.OK).send("Skills updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the skills.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the skils." + error.message);
  }
};
