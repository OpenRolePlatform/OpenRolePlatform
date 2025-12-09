import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { MessageModel, MessageType } from "../WebsocketTypes";
import { _postItem } from "./routes/post-item";
import { _putOneItem } from "./routes/put-one-item";
import { _getOneItem } from "./routes/get-one-item";
import { _getAllItems } from "./routes/get-all-items";

//Get methods
export const getItems = async (req: any, res: any) => {
  try {
    const items = await _getAllItems();
    if (items) {
      res.status(StatusCodes.OK).send(items);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Items not found.");
    }
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const getOneItem = async (req: any, res: any) => {
  try {
    const id = req.params.itemID || req.query.itemID || req.query._id;
    const item = await _getOneItem(id);

    if (item) {
      res.status(StatusCodes.OK).send(item);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Item not found");
    }
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

//Post methods

export const postItems = async (req: any, res: any) => {
  try {
    const body = req.body;
    let itemsInput: any[] = [];

    if (body.items && Array.isArray(body.items)) {
      itemsInput = body.items;
    } else if (req.body.items) {
      itemsInput = Object.values(req.body.items);
    } else {
      itemsInput = [body];
    }

    const createdResults: any[] = [];

    for (let i = 0; i < itemsInput.length; i++) {
      const itemData = itemsInput[i];

      if (req.files && Array.isArray(req.files)) {
        const fileMatch = req.files.find((f: any) => f.fieldname.includes(`[${i}][image]`));

        if (fileMatch) {
          itemData.image = `images/${fileMatch.filename}`;
        }
      }

      const newItem = await _postItem(itemData);
      createdResults.push(newItem);

      WebSocketService.Instance.broadcast({
        type: MessageType.New,
        model: MessageModel.item,
        data: newItem,
      });
    }

    if (createdResults.length === 1 && !req.body.items) {
      res.status(StatusCodes.OK).send(createdResults[0]);
    } else {
      res.status(StatusCodes.OK).send(createdResults);
    }

  } catch (error: any) {
    console.error("Error creating item:", error);
    if (error.name === 'ZodError') {
      return res.status(StatusCodes.BAD_REQUEST).send(error.issues);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

//Put methods
export const putOneItem = async (req: any, res: any) => {
  try {
    const itemID = req.params.itemID || req.body._id;
    const body = req.body;

    if (req.file) {
      body.image = `images/${req.file.filename}`;
    }

    const updatedItem = await _putOneItem(itemID, body);

    if (!updatedItem) {
      return res.status(StatusCodes.NOT_FOUND).send("Item not found");
    }

    res.status(StatusCodes.OK).send(updatedItem);

    WebSocketService.Instance.broadcast({
      type: MessageType.Update,
      model: MessageModel.item,
      data: updatedItem,
    });

  } catch (error: any) {
    console.error("Error updating item:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
