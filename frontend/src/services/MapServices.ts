import axios from "axios";
import { MapType } from "../models/MapModels";

const API = import.meta.env.VITE_BACKEND_URL + "/api/maps";

export async function createMap(data: MapType): Promise<MapType> {
  const res = await axios.post(API, data);
  return res.data;
}

export async function updateMap(id: string, data: MapType): Promise<MapType> {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
}

export async function getMaps(): Promise<MapType[]> {
  const res = await axios.get(API);
  return res.data;
}

export async function getMap(id: string): Promise<MapType> {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
}

export async function deleteMap(id: string): Promise<void> {
  await axios.delete(`${API}/${id}`);
}
