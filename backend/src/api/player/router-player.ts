import express from "express";
import upload from "../../fileUpload";
import { getPlayer, getPlayers, postPlayer, putPlayer } from "./player-handler";

//player router
const playerRouter = express.Router();

//get methods
playerRouter.get("/", getPlayers);
playerRouter.get("/:playerID", getPlayer);

//create and update methods
playerRouter.post("/", upload.single("image"), postPlayer);
playerRouter.put("/:playerID", upload.single("image"), putPlayer);

export default playerRouter;
