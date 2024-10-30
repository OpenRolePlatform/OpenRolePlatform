import express from "express";
import {
  getCampaigns,
  getSelectCampaign,
  putCampaign,
} from "./campaign-handler";

const campaignRouter = express.Router();

//campaign router
//get methods
campaignRouter.get("/", getCampaigns);
campaignRouter.get("/:campaignID", getSelectCampaign);

//put methods
campaignRouter.put("/:campaignID", putCampaign);

export default campaignRouter;
