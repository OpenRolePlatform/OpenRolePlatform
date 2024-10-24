import express from "express";
import {
  getCharacter,
  getCharacterStats,
  getHpStats,
  getOtherCharacterStats,
  getSkillsStats,
  putCharacter,
  putCharacterStats,
  putHpStats,
  putOtherCharacterStats,
  putSkillsStats,
} from "./character-handler";

const characterRouter = express.Router();

//character router
//get methods
characterRouter.get("/:characterID", getCharacter);
characterRouter.get("/:characterID/stats", getCharacterStats);
characterRouter.get("/:characterID/other", getOtherCharacterStats);
characterRouter.get("/:characterID/hp", getHpStats);
characterRouter.get("/:characterID/skills", getSkillsStats);

//put methods
characterRouter.put("/:characterID", putCharacter);
characterRouter.put("/:characterID/stats", putCharacterStats);
characterRouter.put("/:characterID/other", putOtherCharacterStats);
characterRouter.put("/:characterID/hp", putHpStats);
characterRouter.put("/:characterID/skills", putSkillsStats);

export default characterRouter;
