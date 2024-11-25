import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import {
  createPlayer,
  getAllPlayers,
  getPlayerDetails,
  updatePlayer,
} from "./player-controller";

//get methods
export const getPlayers = async (req: any, res: any) => {
  try {
    const players = await getAllPlayers();
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
    const player = await getPlayerDetails(req.params.playerID);
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
    const newPlayer = await createPlayer(body);
    //player already exists
    if (!newPlayer)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("A player with this same id already exists");
    //player created
    res.status(StatusCodes.CREATED).send(newPlayer);
    WebSocketService.Instance.broadcast({
      type: "New",
      model: "player",
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
    let updatedPlayer = await updatePlayer(req.params.playerID, req.body);
    if (!updatedPlayer)
      return res.status(StatusCodes.NOT_FOUND).send("Player not found.");
    res.status(StatusCodes.OK).send("Player updated correctly.");
    WebSocketService.Instance.broadcast({
      type: "Update",
      model: "player",
      data: updatedPlayer,
    });
  } catch (error) {
    console.error("Error while trying to update the player.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the player: " + error.message);
  }
};
