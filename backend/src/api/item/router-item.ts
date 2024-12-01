import express from "express";
import { getItems, postItem } from "./item-handler";

//item router
const itemRouter = express.Router();

//get methods
//itemRouter.get("/:characterID/one", getOneItem);
//itemRouter.get("/:characterID/all", getItems);
//itemRouter.get("/allDB", getItemsDB);

//put methods
itemRouter.post("/", postItem);
itemRouter.get("/", getItems);
//itemRouter.put("/:characterID/one", putOneItem);

export default itemRouter;
