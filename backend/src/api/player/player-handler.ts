import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { MessageModel, MessageType } from "../WebsocketTypes";
import { _enrollPlayer } from "./routes/enroll-player";
import {
  _getPlayerCampaigns,
  _getPlayerDetails,
} from "./routes/get-player-details";
import { _getAllPlayers } from "./routes/get-players";
import { _postPlayer } from "./routes/post-player";
import { _putPlayer } from "./routes/put-player";

//get methods
export const getPlayers = async (req: any, res: any) => {
  try {
    const players = await _getAllPlayers();
    if (players) return res.status(StatusCodes.OK).send(players);
    else return res.status(StatusCodes.NOT_FOUND).send("Players not found.");
  } catch (error) {
    console.error("Error while trying to obtain the players.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the players." + error.message);
  }
};

export const getPlayer = async (req: any, res: any) => {
  try {
    const player = await _getPlayerDetails(req.params.playerID);
    if (!player)
      return res.status(StatusCodes.NOT_FOUND).send("Player not found.");
    else res.status(StatusCodes.OK).send(player);
  } catch (error) {
    console.error("Error while trying to obtain the player details.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the player details: " + error.message
      );
  }
};

export const getPlayerCampaigns = async (req: any, res: any) => {
  try {
    const player = await _getPlayerCampaigns(req.params.playerID);
    if (!player)
      return res.status(StatusCodes.NOT_FOUND).send("Player not found.");
    else res.status(StatusCodes.OK).send(player);
  } catch (error) {
    console.error("Error while trying to obtain the player details.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the player details: " + error.message
      );
  }
};

//post campaign
export const postPlayer = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    const newPlayer = await _postPlayer(body);
    //player already exists
    if (!newPlayer)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("A player with this same id already exists");
    //player created
    res.status(StatusCodes.CREATED).send(newPlayer);
    WebSocketService.Instance.broadcast({
      type: MessageType.New,
      model: MessageModel.player,
      data: newPlayer,
    });
  } catch (error) {
    console.error("Error while trying to create a player.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to create a player: " + error.message);
  }
};

//put methods
export const putPlayer = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    let updatedPlayer = await _putPlayer(req.params.playerID, req.body);
    if (!updatedPlayer)
      return res.status(StatusCodes.NOT_FOUND).send("Player not found.");
    res.status(StatusCodes.OK).send("Player updated correctly.");
    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.player,
      data: updatedPlayer,
    });
  } catch (error) {
    console.error("Error while trying to update the player.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the player: " + error.message);
  }
};

export const enrollPlayer = async (req: any, res: any) => {
  try {
    const [updatedPlayer, updatedCampaign] = await _enrollPlayer(
      req.params.playerID,
      req.params.campaignID
    );
    if (!updatedPlayer)
      return res.status(StatusCodes.NOT_FOUND).send(updatedPlayer);
    res.status(StatusCodes.OK).send(updatedPlayer);
    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.player,
      data: updatedPlayer,
    });
    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.campaign,
      data: updatedCampaign,
    });
  } catch (error) {
    console.error("Error while trying to update the player.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to update the charplayeracter. " + error.message
      );
  }
};
