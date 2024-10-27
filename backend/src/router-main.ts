import { Application } from "express";
import { StatusCodes } from "http-status-codes";
import characterRouter from "./api/character/router-character";

export function routes(app: Application) {
  //main get at root path
  app.get("/", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: "OpenRolePlatform database loaded successfully" });
  });

  app.use("/api/character", characterRouter);
}
