import express from "express";
import upload from "../../fileUpload";
import {
  getCharacter,
  getCharacters,
  postCharacter,
  putCharacter,
} from "./character-handler";

//character router
const characterRouter = express.Router();

//get method
characterRouter.get("/", getCharacters);
characterRouter.post("/", upload.single("image"), postCharacter);
characterRouter.get("/:characterID", getCharacter);
//characterRouter.get("/:ownerID", getCharactersOwner);

//create and update methods
characterRouter.put("/:characterID", upload.single("image"), putCharacter);

export default characterRouter;
