import express from "express";
import {
  getAllSpells,
  getAllSpellsDB,
  getOneSpell,
  putOneSpell,
} from "./spell-handler";

const spellRouter = express.Router();

//spell router
//get methods
spellRouter.get("/:characterID/one", getOneSpell);
spellRouter.get("/:characterID/all", getAllSpells);
spellRouter.get("/allDB", getAllSpellsDB);

//put methods
spellRouter.put("/:characterID/one", putOneSpell);

export default spellRouter;
