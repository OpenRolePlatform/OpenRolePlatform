import express from "express";

import upload from "../../fileUpload";
import {
  getCampaigns,
  getSelectCampaign,
  postCampaign,
  putCampaign,
} from "./campaign-handler";

const campaignRouter = express.Router();

//campaign router
//get methods
campaignRouter.get("/", getCampaigns);
campaignRouter.post("/", upload.single("image"), postCampaign);
campaignRouter.get("/:campaignID", getSelectCampaign);

//put methods
campaignRouter.put("/:campaignID", putCampaign);

export default campaignRouter;
