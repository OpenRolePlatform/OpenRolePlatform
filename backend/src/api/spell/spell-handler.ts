import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { MessageModel, MessageType } from "../WebsocketTypes";
import { _getAllSpells } from "./routes/get-all-spells";
import { _getSpell } from "./routes/get-spell";
import { _putSpell } from "./routes/put-spell";
import { _postSpell } from "./routes/post-spell";
import { _deleteSpell } from "./routes/delete-spell";

export const getOneSpell = async (req: any, res: any) => {
  try {
    const item = await _getSpell(req.params.characterID, req.query.name);
    if (item) {
      return res.status(StatusCodes.OK).send(item);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Spell not found.");
    }
  } catch (error: any) {
    console.error("Error while trying to obtain the spell.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the spell." + error.message);
  }
};

export const getSpells = async (req: any, res: any) => {
  try {

    const items = await _getAllSpells(req.params.characterID, req.query, false);
    if (items) {
      return res.status(StatusCodes.OK).send(items);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Spells not found.");
    }
  } catch (error: any) {
    console.error("Error while trying to change the items.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the spells." + error.message);
  }
};

export const getSpellsDB = async (req: any, res: any) => {
  try {

    const items = await _getAllSpells(req.params.characterID, req.query, true);
    if (items) {
      return res.status(StatusCodes.OK).send(items);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Spell not found.");
    }
  } catch (error: any) {
    console.error("Error while trying to change the items.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the spells." + error.message);
  }
};

export const putOneSpell = async (req: any, res: any) => {
  try {
    await _putSpell(req.params.characterID, req.query.name, req.body);

    res.status(StatusCodes.OK).send("Spell updated correctly.");

    WebSocketService.Instance.broadcast({
      owner: req.params.characterID,
      name: req.query.name,
      data: req.body,
    } as any);

  } catch (error: any) {
    console.error("Error while trying to update the spell.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the spell." + error.message);
  }
};

// ==========================================
// FUTURE METHODS (Not implemented yet on frontend)
// ==========================================

export const postSpell = async (req: any, res: any) => {
  try {
    const newSpell = await _postSpell(req.body);

    res.status(StatusCodes.CREATED).send(newSpell);

    WebSocketService.Instance.broadcast({
      type: MessageType.New,
      model: MessageModel.spell,
      data: newSpell,
    });
  } catch (error: any) {
    console.error("Error creating spell:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const deleteSpell = async (req: any, res: any) => {
  try {
    await _deleteSpell(req.params.spellID);

    res.status(StatusCodes.OK).send("Spell deleted");

    WebSocketService.Instance.broadcast({
      type: MessageType.Remove,
      model: MessageModel.spell,
      data: { _id: req.params.spellID },
    });
  } catch (error: any) {
    console.error("Error deleting spell:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
