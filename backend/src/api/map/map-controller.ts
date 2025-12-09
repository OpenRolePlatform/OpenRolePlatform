//import { Request, Response } from "express";
//import { MapModel } from "../../core/models/map/map-model";

//export async function createMap(req: Request, res: Response) {
//  try {
//    const newMap = await MapModel.create(req.body);
//    return res.status(201).json(newMap);
//  } catch (err) {
//    return res.status(500).json({ error: err });
//  }
//}

//export async function getMaps(req: Request, res: Response) {
//  try {
//    const maps = await MapModel.find();
//    return res.json(maps);
//  } catch (err) {
//    return res.status(500).json({ error: err });
//  }
//}

//export async function getMapById(req: Request, res: Response) {
//  try {
//    const map = await MapModel.findById(req.params.id);
//    return res.json(map);
//  } catch (err) {
//    return res.status(500).json({ error: err });
//  }
//}

//export async function updateMap(req: Request, res: Response) {
//  try {
//    const updated = await MapModel.findByIdAndUpdate(req.params.id, req.body, {
//      new: true,
//    });
//    return res.json(updated);
//  } catch (err) {
//    return res.status(500).json({ error: err });
//  }
//}

//export async function deleteMap(req: Request, res: Response) {
//  try {
//    await MapModel.findByIdAndDelete(req.params.id);
//    return res.sendStatus(204);
//  } catch (err) {
//    return res.status(500).json({ error: err });
//  }
//}
