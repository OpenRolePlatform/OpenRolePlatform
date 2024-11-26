import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";

import {
  createCharacter,
  getAllCharacters,
  getAllCharactersOwner,
  getCharacterDetails,
  updateCharacter,
} from "./characters-controller";

//get methods

export const getCharacters = async (req: any, res: any) => {
  try {
    const characters = await getAllCharacters();
    if (characters) {
      return res.status(StatusCodes.OK).send(characters);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Characters not found.");
    }
  } catch (error) {
    console.error("Error while trying to obtain the characters.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the characters. " + error.message);
  }
};

export const getCharactersOwner = async (req: any, res: any) => {
  try {
    const characters = await getAllCharactersOwner(req.params.ownerID);
    if (characters) {
      return res.status(StatusCodes.OK).send(characters);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Characters not found.");
    }
  } catch (error) {
    console.error("Error while trying to get one character.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to get one character. " + error.message);
  }
};

export const getCharacter = async (req: any, res: any) => {
  try {
    const character = await getCharacterDetails(req.params.characterID);
    if (!character)
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");

    res.status(StatusCodes.OK).send(character);
  } catch (error) {
    console.error("Error while trying to get one character.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to get one character. " + error.message);
  }
};

//put methods
export const postCharacter = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    let newCharacter = await createCharacter(req.body);
    if (!newCharacter)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("A character with this same id already exists");
    res.status(StatusCodes.OK).send(newCharacter);
    WebSocketService.Instance.broadcast({
      type: "New",
      model: "character",
      data: newCharacter,
    });
  } catch (error) {
    console.error("Error while trying to update the character.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to  the character. " + error.message);
  }
};

export const putCharacter = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    let updatedCharacter = await updateCharacter(
      req.params.characterID,
      req.body
    );
    if (!updatedCharacter)
      return res.status(StatusCodes.NOT_FOUND).send(updateCharacter);
    res.status(StatusCodes.OK).send(updatedCharacter);
    WebSocketService.Instance.broadcast({
      type: "Update",
      model: "character",
      data: updatedCharacter,
    });
  } catch (error) {
    console.error("Error while trying to update the character.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the character. " + error.message);
  }
};
