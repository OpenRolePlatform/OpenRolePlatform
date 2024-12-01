import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";

import {
  createItems,
  getAllItems,
  getItem,
  updateItem,
} from "./items-controller";

//get methods
export const getOneItem = async (req: any, res: any) => {
  try {
    const item = await getItem(req.params.characterID, req.query.name);
    if (item) {
      return res.status(StatusCodes.OK).send(item);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Item not found.");
    }
  } catch (error) {
    console.error("Error while trying to obtain the item.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the item." + error.message);
  }
};

export const getItems = async (req: any, res: any) => {
  try {
    const items = await getAllItems();
    if (items) {
      return res.status(StatusCodes.OK).send(items);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Items not found.");
    }
  } catch (error) {
    console.error("Error while trying to change the items.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to change the items." + error.message);
  }
};

export const getItemsDB = async (req: any, res: any) => {
  try {
    const items = await getAllItems();
    if (items) {
      return res.status(StatusCodes.OK).send(items);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Items not found.");
    }
  } catch (error) {
    console.error("Error while trying to change the items.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to change the items." + error.message);
  }
};

export const postItem = async (req: any, res: any) => {
  try {
    await createItems(req.body);
    res.status(StatusCodes.OK).send("Item updated correctly.");
    WebSocketService.Instance.broadcast({
      owner: req.params.characterID,
      name: req.params.name,
      data: req.body,
    });
  } catch (error) {
    console.error("Error while trying to update the items.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the items." + error.message);
  }
};

//put methods
export const putOneItem = async (req: any, res: any) => {
  try {
    await updateItem(req.params.characterID, req.query.name, req.body);
    res.status(StatusCodes.OK).send("Item updated correctly.");
    WebSocketService.Instance.broadcast({
      owner: req.params.characterID,
      name: req.params.name,
      data: req.body,
    });
  } catch (error) {
    console.error("Error while trying to update the items.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the items." + error.message);
  }
};
