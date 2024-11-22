import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { _getCampaigns } from "./routes/get-campaigns";
import { _getSelectCampaign } from "./routes/get-select-campaign";
import { _postCampaign } from "./routes/post-campaign";
import { _putCampaign } from "./routes/put-campaign";

//get methods
export const getCampaigns = async (req: any, res: any) => {
  try {
    const campaigns = await _getCampaigns();
    if (campaigns) {
      return res.status(StatusCodes.OK).send(campaigns);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Campaigns not found.");
    }
  } catch (error) {
    console.error("Error while trying to obtain the campaigns.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the campaigns." + error.message);
  }
};

export const getSelectCampaign = async (req: any, res: any) => {
  try {
    await _getSelectCampaign(req.params.campaignID);

    /*   return res.sendStatus(StatusCodes.OK);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Campaigns not found.");
    } */
  } catch (error) {
    console.error("Error while trying to change the campaigns.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to change the campaigns." + error.message);
  }
};

//post campaign
export const postCampaign = async (req: any, res: any) => {
  try {
    let body = req.body;
    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }
    const newCampaign = await _postCampaign(body);
    res.status(StatusCodes.CREATED).send(newCampaign);
    WebSocketService.Instance.broadcast({
      name: req.params.campaignID,
      data: body,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send("Error:" + error.message);
  }
};

//put methods
export const putCampaign = async (req: any, res: any) => {
  try {
    await _putCampaign(req.params.campaignID, req.body);
    res.status(StatusCodes.OK).send("Campaign updated correctly.");
    WebSocketService.Instance.broadcast({
      name: req.params.campaignID,
      data: req.body,
    });
  } catch (error) {
    console.error("Error while trying to update the campaign.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the campaign." + error.message);
  }
};
