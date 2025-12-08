import { Schema } from "mongoose";

export const MapSchema = new Schema(
  {
    name: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    tiles: { type: Array, default: [] },        // grid de terreno
    tokens: { type: Array, default: [] },       // lista de tokens
    campaignId: { type: String },               // si quieres asociarlo a una campaña
  },
  { timestamps: true }
);
