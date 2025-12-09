import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { MessageModel, MessageType } from "../WebsocketTypes";
import { _getPlayers } from "./routes/get-players";
import { _getPlayerDetails } from "./routes/get-player-details";
import { _postPlayer } from "./routes/post-player";
import { _putPlayer } from "./routes/put-player";
import { _deletePlayer } from "./routes/delete-player";
import { _enrollPlayers } from "../campaign/routes/enroll-players"; // Reutilizamos lógica
import { prisma } from "../../connectDB";
import { CampaignAdapter } from "../../core/adapters/campaign-adapter";

export const getPlayers = async (req: any, res: any) => {
  try {
    const players = await _getPlayers();
    if (players) return res.status(StatusCodes.OK).send(players);
    else return res.status(StatusCodes.NOT_FOUND).send("Players not found.");
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const getPlayer = async (req: any, res: any) => {
  try {
    const player = await _getPlayerDetails(req.params.playerID);
    if (!player) return res.status(StatusCodes.NOT_FOUND).send("Player not found");
    res.status(StatusCodes.OK).send(player);
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const getPlayerCampaigns = async (req: any, res: any) => {
  try {
    const player = await _getPlayerDetails(req.params.playerID);
    if (!player) return res.status(StatusCodes.NOT_FOUND).send("Player not found");

    res.status(StatusCodes.OK).send(player.campaigns);
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const postPlayer = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    const newPlayer = await _postPlayer(body);
    res.status(StatusCodes.CREATED).send(newPlayer);

    WebSocketService.Instance.broadcast({
      type: MessageType.New,
      model: MessageModel.player,
      data: newPlayer,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const putPlayer = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    const updated = await _putPlayer(req.params.playerID, body);
    if (!updated) return res.status(StatusCodes.NOT_FOUND).send("Player not found");

    res.status(StatusCodes.OK).send(updated);
    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.player,
      data: updated,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const enrollPlayer = async (req: any, res: any) => {
  try {
    const { playerID, campaignID } = req.params;
    const result = await _enrollPlayers(campaignID, [playerID]);

    if (!result || !result[0]) {
      return res.status(StatusCodes.BAD_REQUEST).send("Could not enroll player");
    }

    res.status(StatusCodes.OK).send("Player enrolled successfully");

    WebSocketService.Instance.broadcast({
      type: MessageType.UpdateArray,
      model: MessageModel.player,
      data: result[0],
    });

    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.campaign,
      data: result[1],
    });

  } catch (error: any) {
    console.error("Error enrolling player:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const deletePlayer = async (req: any, res: any) => {
  try {
    await _deletePlayer(req.params.playerID);
    res.status(StatusCodes.OK).send("Player deleted");
    WebSocketService.Instance.broadcast({
      type: MessageType.Remove,
      model: MessageModel.player,
      data: { _id: req.params.playerID },
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
