import express from "express";
import { getItems, getItemsDB, getOneItem, putOneItem } from "./item-handler";

const itemRouter = express.Router();

//item router
//get methods
itemRouter.get("/:characterID/one", getOneItem);
itemRouter.get("/:characterID/all", getItems);
itemRouter.get("/allDB", getItemsDB);

//put methods
itemRouter.put("/:characterID/one", putOneItem);

export default itemRouter;
