import express from "express";
import {
  getOneSpell,
  getSpells,
  getSpellsDB,
  putOneSpell,
} from "./spell-handler";

const spellRouter = express.Router();

//spell router
//get methods
spellRouter.get("/:characterID/one", getOneSpell);
spellRouter.get("/:characterID/all", getSpells);
spellRouter.get("/allDB", getSpellsDB);

//put methods
spellRouter.put("/:characterID/one", putOneSpell);

export default spellRouter;
