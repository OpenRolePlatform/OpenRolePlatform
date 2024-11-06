import express from "express";
import {
  getAllItems,
  getAllItemsDB,
  getOneItem,
  putOneItem,
} from "./item-handler";

const itemRouter = express.Router();

//item router
//get methods
itemRouter.get("/:characterID/one", getOneItem);
itemRouter.get("/:characterID/all", getAllItems);
itemRouter.get("/allDB", getAllItemsDB);

//put methods
itemRouter.put("/:characterID/one", putOneItem);

export default itemRouter;