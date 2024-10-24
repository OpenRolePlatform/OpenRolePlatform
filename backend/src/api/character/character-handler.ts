import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../WebSocketServices";
import { _getCharacter } from "./routes/get-character";
import { _getCharacterHpStats } from "./routes/get-character-hp-stats";
import { _getCharacterOtherStats } from "./routes/get-character-other-stats";
import { _getCharacterSkillsStats } from "./routes/get-character-skills-stats";
import { _getCharacterStats } from "./routes/get-character-stats";
import { _putCharacter } from "./routes/put-character";
import { _putCharacterHpStats } from "./routes/put-character-hp-stats";
import { _putCharacterOtherStats } from "./routes/put-character-other-stats";
import { _putCharacterSkillsStats } from "./routes/put-character-skills-stats";
import { _putCharacterStats } from "./routes/put-character-stats";

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
    console.error("Error while trying to obtain the character.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the character." + error.message);
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
    console.error("Error while trying to obtain the character stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the character stats." + error.message
      );
  }
};

export const getCharacterOtherStats = async (req: any, res: any) => {
  try {
    const stats = await _getCharacterOtherStats(req.params.characterID);
    if (stats) {
      return res.status(StatusCodes.OK).send(stats);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to obtain the character other stats.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the character other stats." +
          error.message
      );
  }
};

export const getHpStats = async (req: any, res: any) => {
  try {
    const stats = await _getCharacterHpStats(req.params.characterID);
    if (stats) {
      return res.status(StatusCodes.OK).send(stats);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to obtain the character hp.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the character stats." + error.message
      );
  }
};

export const getSkillsStats = async (req: any, res: any) => {
  try {
    const stats = await _getCharacterSkillsStats(req.params.characterID);
    if (stats) {
      return res.status(StatusCodes.OK).send(stats);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");
    }
  } catch (error) {
    console.error("Error while trying to obtain the character skills.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the character skills." + error.message
      );
  }
};

//put methods
export const putCharacter = async (req: any, res: any) => {
  try {
    await _putCharacter(req.params.characterID, req.body);
    res.status(StatusCodes.OK).send("Character updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the character.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the character." + error.message);
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
    await _putCharacterOtherStats(req.params.characterID, req.body);
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
    await _putCharacterHpStats(req.params.characterID, req.body);
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
    await _putCharacterSkillsStats(req.params.characterID, req.body);
    res.status(StatusCodes.OK).send("Skills updated correctly.");
  } catch (error) {
    console.error("Error while trying to update the skills.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the skils." + error.message);
  }
};
