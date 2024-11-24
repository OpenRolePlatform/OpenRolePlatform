import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
  getLoadedCampaign,
  loadCampaign,
  updateCampaign,
} from "./campaigns-controller";

//get methods
export const getCampaigns = async (req: any, res: any) => {
  try {
    const campaigns = await getAllCampaigns();
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
    const campaign = await getCampaignDetails(req.params.campaignID);
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

//post campaign
export const postCampaign = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    const newCampaign = await createCampaign(body);
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
    let updatedCampaign = await updateCampaign(req.params.campaignID, req.body);
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

export const selectCampaign = async (req: any, res: any) => {
  try {
    let selectedCampaign = await loadCampaign(req.params.campaignID);
    if (!selectedCampaign)
      return res.status(StatusCodes.NOT_FOUND).send("Campaign not found.");
    res.status(StatusCodes.OK).send("Campaign loaded correctly.");
    WebSocketService.Instance.broadcast({
      type: "CampaignLoad",
      model: "campaign",
      data: selectCampaign,
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
    let selectedCampaign = await getLoadedCampaign();
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
