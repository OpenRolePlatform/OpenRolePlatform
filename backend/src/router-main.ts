import { Application } from "express";
import { StatusCodes } from "http-status-codes";
import campaignRouter from "./api/campaign/router-campaign";
import characterRouter from "./api/character/router-character";
import itemRouter from "./api/item/router-item";
import notesRouter from "./api/notes/router-notes";
import playerRouter from "./api/player/router-player";
import spellRouter from "./api/spell/router-spell";
import upload from "./fileUpload";

export function routes(app: Application) {
  //main get at root path
  app.get("/", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: "OpenRolePlatform database loaded successfully" });
  });

  app.use("/api/player", playerRouter);
  app.use("/api/campaign", campaignRouter);
  app.use("/api/character", characterRouter);
  app.use("/api/items", itemRouter);
  app.use("/api/spells", spellRouter);
  app.use("/api/notes", notesRouter);

  app.post("/api/upload", upload.single("image"), (req: any, res: any) => {
    return res.status(StatusCodes.CREATED).send({
      url: `/upload/images/${req.file.filename}`,
    });
  });
}
