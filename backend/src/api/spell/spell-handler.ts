import { StatusCodes } from "http-status-codes";
import { WebSocketService } from "../../connectWS";
import { _getAllSpells } from "./routes/get-all-spells";
import { _getSpell } from "./routes/get-spell";
import { _putSpell } from "./routes/put-spell";

//get methods
export const getOneSpell = async (req: any, res: any) => {
  try {
    const item = await _getSpell(req.params.characterID, req.query.name);
    if (item) {
      return res.status(StatusCodes.OK).send(item);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("spell not found.");
    }
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    console.error("Error while trying to change the items.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to obtain the spells." + error.message);
  }
};

//put methods
export const putOneSpell = async (req: any, res: any) => {
  try {
    await _putSpell(req.params.characterID, req.query.name, req.body);
    res.status(StatusCodes.OK).send("Spell updated correctly.");
    WebSocketService.Instance.broadcast({
      owner: req.params.characterID,
      name: req.params.name,
      data: req.body,
    });
  } catch (error) {
    console.error("Error while trying to update the spell.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error while trying to update the spell." + error.message);
  }
};
