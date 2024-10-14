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

const delay = 5000;

export function routes(app: Express) {
  app.use(function (req, res, next) {
    setTimeout(next, delay);
  });

  app.get("/", (req, res) => {
    res
      .status(200)
      .json({ message: "OpenRolePlatform database loaded successfully" });
  });

  app.put("/api/characterStats/:characterID", putCharacterStats);
  app.get("/api/characterStats/:characterID", getCharacterStats);
  app.put("/putOtherCharacterStats", putOtherCharacterStats);
  app.get("/getOtherCharacterStats", getOtherCharacterStats);
  app.put("/putHpStats", putHpStats);
  app.get("/getHpStats", getHpStats);
  app.put("/putSkillsStats", putSkillsStats);
  app.get("/getSkillsStats", getSkillsStats);
}
