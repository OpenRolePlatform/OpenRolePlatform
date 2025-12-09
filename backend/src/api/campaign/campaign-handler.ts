import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { MessageModel, MessageType } from "../WebsocketTypes";
import { _enrollPlayers } from "./routes/enroll-players";
import { _getActiveCampaign } from "./routes/get-active-campaign";
import { _getCampaign } from "./routes/get-campaign";
import { _getCampaigns } from "./routes/get-campaigns";
import { _getLoadCampaign } from "./routes/get-load-campaign";
import { _postCampaign } from "./routes/post-campaign";
import { _putCampaign } from "./routes/put-campaign";
import { _deleteCampaign } from "./routes/delete-campaign";

// ==========================================
// GET METHODS
// ==========================================

export const getCampaigns = async (req: any, res: any) => {
  try {
    const campaigns = await _getCampaigns();
    if (campaigns) return res.status(StatusCodes.OK).send(campaigns);
    else return res.status(StatusCodes.NOT_FOUND).send("Campaigns not found.");
  } catch (error: any) {
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
  } catch (error: any) {
    console.error("Error while trying to obtain the campaign details.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the campaign details: " + error.message);
  }
};

export const getCampaignPlayers = async (req: any, res: any) => {
  try {
    const campaign = await _getCampaign(req.params.campaignID);
    if (!campaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found.");
    else res.status(StatusCodes.OK).send(campaign.players);
  } catch (error: any) {
    console.error("Error while trying to obtain the campaign players.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the campaign players: " + error.message);
  }
};

// ==========================================
// Selecting Logic
// ==========================================

export const selectCampaign = async (req: any, res: any) => {
  try {
    let selectedCampaign = await _getLoadCampaign(req.params.campaignID);

    if (!selectedCampaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found.");

    res.status(StatusCodes.OK).send("Campaign loaded correctly.");

    WebSocketService.Instance.broadcast({
      type: MessageType.CampaignLoad,
      model: MessageModel.campaign,
      data: selectedCampaign,
    });
  } catch (error: any) {
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
  } catch (error: any) {
    console.error("Error while trying to get the loaded campaign.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to get the loaded campaign." + error.message);
  }
};

// ==========================================
// POST METHODS
// ==========================================

export const postCampaign = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    const newCampaign = await _postCampaign(body);

    if (!newCampaign)
      return res.status(StatusCodes.BAD_REQUEST).send("A campaign with this same id already exists");

    res.status(StatusCodes.CREATED).send(newCampaign);

    WebSocketService.Instance.broadcast({
      type: MessageType.New,
      model: MessageModel.campaign,
      data: newCampaign,
    });
  } catch (error: any) {
    console.error("Error while trying to create a campaign.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to create a campaign: " + error.message);
  }
};

// ==========================================
// PUT METHODS
// ==========================================

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
      type: MessageType.Update,
      model: MessageModel.campaign,
      data: updatedCampaign,
    });
  } catch (error: any) {
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
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found");

    res.status(StatusCodes.OK).send(updatedCampaign);

    WebSocketService.Instance.broadcast({
      type: MessageType.UpdateArray,
      model: MessageModel.player,
      data: updatedPlayers,
    });

    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.campaign,
      data: updatedCampaign,
    });
  } catch (error: any) {
    console.error("Error while trying to to enroll players.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to enroll players. " + error.message);
  }
};

// ==========================================
// DELETE METHODS
// ==========================================

export const deleteCampaign = async (req: any, res: any) => {
  try {
    await _deleteCampaign(req.params.campaignID);

    res.status(StatusCodes.OK).send("Campaign deleted");

    WebSocketService.Instance.broadcast({
      type: MessageType.Remove,
      model: MessageModel.campaign,
      data: { _id: req.params.campaignID },
    });
  } catch (error: any) {
    console.error("Error while trying to delete campaign.", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to delete campaign: " + error.message);
  }
};
