import { Express } from "express-serve-static-core";
import {
  getCharacterStats,
  getHpStats,
  getOtherCharacterStats,
  getSkillsStats,
  putCharacterStats,
  putHpStats,
  putOtherCharacterStats,
  putSkillsStats,
} from "./api/character-router";

export function routes(app: Express) {
  //main get at root path
  app.get("/", (req, res) => {
    res
      .status(200)
      .json({ message: "OpenRolePlatform database loaded successfully" });
  });

  //character router
  //get methods
  app.get("/api/characterStats/:characterID", getCharacterStats);
  app.get("/api/otherCharacterStats/:characterID", getOtherCharacterStats);
  app.get("/api/hpStats/:characterID", getHpStats);
  app.get("/api/skillsStats/:characterID", getSkillsStats);

  //put methods
  app.put("/api/characterStats/:characterID", putCharacterStats);
  app.put("/api/otherCharacterStats/:characterID", putOtherCharacterStats);
  app.put("/api/hpStats/:characterID", putHpStats);
  app.put("/api/skillsStats/:characterID", putSkillsStats);
}
