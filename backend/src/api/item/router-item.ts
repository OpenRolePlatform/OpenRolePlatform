import express from "express";
import upload from "../../fileUpload";
import {
  getItems,
  getItemsDB,
  getOneItem,
  postItems,
  putOneItem,
} from "./item-handler";

//item router
const itemRouter = express.Router();

//get methods
itemRouter.get("/:characterID/one", getOneItem);
itemRouter.get("/:characterID/all", getItems);
itemRouter.get("/allDB", getItemsDB);

//put methods
itemRouter.post("/", upload.any("image"), postItems);
itemRouter.get("/", getItems);
itemRouter.put("/:characterID/one", putOneItem);

export default itemRouter;
