import express from "express";
import upload from "../../fileUpload";
import {
  getCampaign,
  getCampaignPlayers,
  getCampaigns,
  getSelectedCampaign,
  postCampaign,
  putCampaign,
  selectCampaign,
} from "./campaign-handler";

//campaign router
const campaignRouter = express.Router();

//get methods
campaignRouter.get("/loaded", getSelectedCampaign);
campaignRouter.get("/", getCampaigns);
campaignRouter.get("/:campaignID", getCampaign);
campaignRouter.get("/:campaignID/players", getCampaignPlayers);

//create and update methods
campaignRouter.post("/", upload.single("image"), postCampaign);
campaignRouter.put("/:campaignID", upload.single("image"), putCampaign);

//select campaign
campaignRouter.post("/:campaignID", selectCampaign);

export default campaignRouter;
