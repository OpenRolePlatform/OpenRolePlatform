import { Router } from "express";
import {
  createMap,
  getMaps,
  getMapById,
  updateMap,
  deleteMap,
} from "./map-controller";

const router = Router();

router.post("/", createMap);
router.get("/", getMaps);
router.get("/:id", getMapById);
router.put("/:id", updateMap);
router.delete("/:id", deleteMap);

export default router;
