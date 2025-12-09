import express from "express";
import {
  getOneSpell,
  getSpells,
  getSpellsDB,
  putOneSpell,
  deleteSpell,
  postSpell
} from "./spell-handler";

const spellRouter = express.Router();

//spell router
//get methods
spellRouter.get("/:characterID/one", getOneSpell);
spellRouter.get("/:characterID/all", getSpells);
spellRouter.get("/allDB", getSpellsDB);

//post methods (TODO: Incorporate to frontend)
spellRouter.post("/", postSpell);

//delete methods (TODO: Incorporate to frontend)
spellRouter.delete("/:spellID", deleteSpell);

//put methods
spellRouter.put("/:characterID/one", putOneSpell);

export default spellRouter;
