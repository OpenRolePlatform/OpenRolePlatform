import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { _getAllItems } from "./routes/get-all-items";
import { _getOneItem } from "./routes/get-one-item";
import { _putOneItem } from "./routes/put-one-item";

//get methods
export const getOneItem = async (req: any, res: any) => {
  try {
    const item = await _getOneItem(req.params.characterID, req.query.name);
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

export const getAllItems = async (req: any, res: any) => {
  try {
    console.log(req.query);
    const items = await _getAllItems(req.params.characterID, req.query, false);
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

// export const getAllItemsEquipable = async (req: any, res: any) => {
//   try {
//     const items = await _getAllItems(
//         req.params.characterID,
//         req.params.name,
//         req.params,
//         false
//       );
//     if (items) {
//       return res.status(StatusCodes.OK).send(items);
//     } else {
//       return res.status(StatusCodes.NOT_FOUND).send("Items not found.");
//     }
//   } catch (error) {
//     console.error("Error while trying to change the items.");
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send("Error while trying to change the items." + error.message);
//   }
// };

// export const getAllItemsEquipped = async (req: any, res: any) => {
//   try {
//     const items = await _getSelectCampaign(
//       req.params.characterID,
//       req.params.name
//     );
//     if (items) {
//       return res.status(StatusCodes.OK).send(items);
//     } else {
//       return res.status(StatusCodes.NOT_FOUND).send("Items not found.");
//     }
//   } catch (error) {
//     console.error("Error while trying to change the items.");
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send("Error while trying to change the items." + error.message);
//   }
// };

// export const getAllItemsType = async (req: any, res: any) => {
//   try {
//     const items = await _getSelectCampaign(
//       req.params.characterID,
//       req.params.name
//     );
//     if (items) {
//       return res.status(StatusCodes.OK).send(items);
//     } else {
//       return res.status(StatusCodes.NOT_FOUND).send("Items not found.");
//     }
//   } catch (error) {
//     console.error("Error while trying to change the items.");
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send("Error while trying to change the items." + error.message);
//   }
// };

export const getAllItemsDB = async (req: any, res: any) => {
  try {
    const items = await _getAllItems(req.params.characterID, req.query, true);
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

//put methods
export const putOneItem = async (req: any, res: any) => {
  try {
    await _putOneItem(req.params.characterID, req.query.name, req.body);
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
