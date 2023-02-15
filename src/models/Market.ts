import mongoose, { Document } from "mongoose";

export interface IMarket {
  coin: string;
  price: number;
}

export type TMarketDocument = Document & IMarket;

const IMarketSchema = new mongoose.Schema(
  {
    coin: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Market = mongoose.model<TMarketDocument>("Market", IMarketSchema);
