import { Application } from "express";
import characterRouter from "./api/character";

export function routes(app: Application) {
  //main get at root path
  app.get("/", (req, res) => {
    res
      .status(200)
      .json({ message: "OpenRolePlatform database loaded successfully" });
  });
  app.use("/api/character", characterRouter);

  //character router
  //get methods
  /* app.get("/api/characterStats/:characterID", getCharacterStats);
  app.get("/api/otherCharacterStats/:characterID", getOtherCharacterStats);
  app.get("/api/hpStats/:characterID", getHpStats);
  app.get("/api/skillsStats/:characterID", getSkillsStats);

  //put methods
  app.put("/api/characterStats/:characterID", putCharacterStats);
  app.put("/api/otherCharacterStats/:characterID", putOtherCharacterStats);
  app.put("/api/hpStats/:characterID", putHpStats);
  app.put("/api/skillsStats/:characterID", putSkillsStats); */
}
