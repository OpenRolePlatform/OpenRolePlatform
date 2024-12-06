import express from "express";
import upload from "../../fileUpload";
import {
  enrollPlayer,
  getPlayer,
  getPlayerCampaigns,
  getPlayers,
  postPlayer,
  putPlayer,
} from "./player-handler";

//player router
const playerRouter = express.Router();

//get methods
playerRouter.get("/", getPlayers);
playerRouter.get("/:playerID", getPlayer);
playerRouter.get("/:playerID/campaigns", getPlayerCampaigns);

//create and update methods
playerRouter.post("/", upload.single("image"), postPlayer);
playerRouter.put("/:playerID", upload.single("image"), putPlayer);
playerRouter.put("/:playerID/enroll/:campaignID", enrollPlayer);

export default playerRouter;
