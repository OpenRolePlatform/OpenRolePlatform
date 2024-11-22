import express from "express";
import {
  getAllCharacters,
  getAllCharactersOwner,
  getCharacter,
  getCharacterOtherStats,
  getCharacterStats,
  getHpStats,
  getSkillsStats,
  putCharacter,
  putCharacterStats,
  putHpStats,
  putOtherCharacterStats,
  putSkillsStats,
} from "./character-handler";

const characterRouter = express.Router();

//character router
//get method
characterRouter.get("/", getAllCharacters);
characterRouter.get("/:ownerID", getAllCharactersOwner);
//get methods
characterRouter.get("/:characterID", getCharacter);
characterRouter.get("/:characterID/stats", getCharacterStats);
characterRouter.get("/:characterID/other", getCharacterOtherStats);
characterRouter.get("/:characterID/hp", getHpStats);
characterRouter.get("/:characterID/skills", getSkillsStats);

//put methods
characterRouter.put("/:characterID", putCharacter);
characterRouter.put("/:characterID/stats", putCharacterStats);
characterRouter.put("/:characterID/other", putOtherCharacterStats);
characterRouter.put("/:characterID/hp", putHpStats);
characterRouter.put("/:characterID/skills", putSkillsStats);

export default characterRouter;
