import { Application } from "express";
import { StatusCodes } from "http-status-codes";
import campaignRouter from "./api/campaign/router-campaign";
import characterRouter from "./api/character/router-character";
import itemRouter from "./api/item/router-item";

export function routes(app: Application) {
  //main get at root path
  app.get("/", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: "OpenRolePlatform database loaded successfully" });
  });

  app.use("/api/campaign", campaignRouter);
  app.use("/api/character", characterRouter);
  app.use("/api/items", itemRouter);
  //app.use("/api/character/:characterID/items", itemRouter);
}
