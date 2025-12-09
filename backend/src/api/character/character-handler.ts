import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { MessageModel, MessageType } from "../WebsocketTypes";
import { _getCharacter } from "./routes/get-character";
import { _getCharacters } from "./routes/get-characters";
import { _getAllCharacters } from "./routes/get-all-characters";
import { _getCharactersOwner } from "./routes/get-characters-owner";
import { _postCharacter } from "./routes/post-character";
import { _putCharacter } from "./routes/put-character";
import { _deleteCharacter } from "./routes/delete-character";

// GET Methods
export const getCharacters = async (req: any, res: any) => {
  try {
    let characters;
    if (Object.keys(req.query).length > 0) {
      characters = await _getCharacters(req.query);
    } else {
      characters = await _getAllCharacters();
    }

    if (characters) {
      return res.status(StatusCodes.OK).send(characters);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Characters not found.");
    }
  } catch (error: any) {
    console.error("Error while trying to obtain the characters.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the characters. " + error.message);
  }
};

export const getCharactersOwner = async (req: any, res: any) => {
  try {
    const characters = await _getCharactersOwner(req.params.ownerID);
    if (characters) {
      return res.status(StatusCodes.OK).send(characters);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Characters not found.");
    }
  } catch (error: any) {
    console.error("Error while trying to get characters by owner.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error: " + error.message);
  }
};

export const getCharacter = async (req: any, res: any) => {
  try {
    const character = await _getCharacter(req.params.characterID);
    if (!character)
      return res.status(StatusCodes.NOT_FOUND).send("Character not found.");

    res.status(StatusCodes.OK).send(character);
  } catch (error: any) {
    console.error("Error while trying to get one character.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error: " + error.message);
  }
};

// POST Methods
export const postCharacter = async (req: any, res: any) => {
  try {
    let body = req.body;

    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }

    let newCharacter = await _postCharacter(body);

    if (!newCharacter)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Could not create character");

    res.status(StatusCodes.OK).send(newCharacter);

    WebSocketService.Instance.broadcast({
      type: MessageType.New,
      model: MessageModel.character,
      data: newCharacter,
    });
  } catch (error: any) {
    console.error("Error while trying to create the character.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error: " + error.message);
  }
};

// PUT Methods
export const putCharacter = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }

    let updatedCharacter = await _putCharacter(
      req.params.characterID,
      body
    );

    if (!updatedCharacter)
      return res.status(StatusCodes.NOT_FOUND).send("Character not found");

    res.status(StatusCodes.OK).send(updatedCharacter);

    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.character,
      data: updatedCharacter,
    });
  } catch (error: any) {
    console.error("Error while trying to update the character.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error: " + error.message);
  }
};

export const deleteCharacter = async (req: any, res: any) => {
  try {
    await _deleteCharacter(req.params.characterID);
    res.status(StatusCodes.OK).send("Character deleted");

    WebSocketService.Instance.broadcast({
      type: MessageType.Remove,
      model: MessageModel.character,
      data: { _id: req.params.characterID },
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
