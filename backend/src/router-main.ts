import { Application } from "express";
import characterRouter from "./api/character/router-character";

export function routes(app: Application) {
  //main get at root path
  app.get("/", (req, res) => {
    res
      .status(200)
      .json({ message: "OpenRolePlatform database loaded successfully" });
  });

  app.use("/api/character", characterRouter);
}
