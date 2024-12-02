import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { _enrollPlayers } from "./routes/enroll-players";
import { _getActiveCampaign } from "./routes/get-active-campaign";
import { _getCampaign, _getCampaignPlayers } from "./routes/get-campaign";
import { _getCampaigns } from "./routes/get-campaigns";
import { _getLoadCampaign } from "./routes/get-load-campaign";
import { _postCampaign } from "./routes/post-campaign";
import { _putCampaign } from "./routes/put-campaign";

//get methods
export const getCampaigns = async (req: any, res: any) => {
  try {
    const campaigns = await _getCampaigns();
    if (campaigns) return res.status(StatusCodes.OK).send(campaigns);
    else return res.status(StatusCodes.NOT_FOUND).send("Campaigns not found.");
  } catch (error) {
    console.error("Error while trying to obtain the campaigns.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the campaigns." + error.message);
  }
};

export const getCampaign = async (req: any, res: any) => {
  try {
    const campaign = await _getCampaign(req.params.campaignID);
    if (!campaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found.");
    else res.status(StatusCodes.OK).send(campaign);
  } catch (error) {
    console.error("Error while trying to obtain the campaign details.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the campaign details: " + error.message
      );
  }
};

export const getCampaignPlayers = async (req: any, res: any) => {
  try {
    const campaign = await _getCampaignPlayers(req.params.campaignID);
    if (!campaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found.");
    else res.status(StatusCodes.OK).send(campaign);
  } catch (error) {
    console.error("Error while trying to obtain the campaign details.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "Error while trying to obtain the campaign details: " + error.message
      );
  }
};

export const selectCampaign = async (req: any, res: any) => {
  try {
    let selectedCampaign = await _getLoadCampaign(req.params.campaignID);
    if (!selectedCampaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found.");
    res.status(StatusCodes.OK).send("Campaign loaded correctly.");
    WebSocketService.Instance.broadcast({
      type: "CampaignLoad",
      model: "campaign",
      data: selectedCampaign,
    });
  } catch (error) {
    console.error("Error while trying to change the campaigns.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to change the campaigns." + error.message);
  }
};

export const getSelectedCampaign = async (req: any, res: any) => {
  try {
    let selectedCampaign = await _getActiveCampaign();
    if (!selectedCampaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not loaded.");
    res.status(StatusCodes.OK).send(selectedCampaign);
  } catch (error) {
    console.error("Error while trying to get the loaded campaign.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to get the loaded campaign." + error.message);
  }
};

//post methods
export const postCampaign = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    const newCampaign = await _postCampaign(body);
    //campaign already exists
    if (!newCampaign)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("A campaign with this same id already exists");
    //campaign created
    res.status(StatusCodes.CREATED).send(newCampaign);
    WebSocketService.Instance.broadcast({
      type: "New",
      model: "campaign",
      data: newCampaign,
    });
  } catch (error) {
    console.error("Error while trying to create a campaign.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to create a campaign: " + error.message);
  }
};

//put methods
export const putCampaign = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    let updatedCampaign = await _putCampaign(req.params.campaignID, req.body);
    if (!updatedCampaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found.");
    res.status(StatusCodes.OK).send("Campaign updated correctly.");
    WebSocketService.Instance.broadcast({
      type: "Update",
      model: "campaign",
      data: updatedCampaign,
    });
  } catch (error) {
    console.error("Error while trying to update the campaign.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the campaign: " + error.message);
  }
};

export const enrollPlayers = async (req: any, res: any) => {
  try {
    const [updatedPlayers, updatedCampaign] = await _enrollPlayers(
      req.params.campaignID,
      req.body
    );
    if (!updatedCampaign)
      return res.status(StatusCodes.NOT_FOUND).send(updatedCampaign);
    res.status(StatusCodes.OK).send(updatedCampaign);
    WebSocketService.Instance.broadcast({
      type: "UpdateArray",
      model: "player",
      data: updatedPlayers,
    });
    WebSocketService.Instance.broadcast({
      type: "Update",
      model: "campaign",
      data: updatedCampaign,
    });
  } catch (error) {
    console.error("Error while trying to to enroll players.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to enroll players. " + error.message);
  }
};
