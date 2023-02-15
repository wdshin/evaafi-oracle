import { RequestHandler } from "express";
import { Market } from "../models/Market";

export const getMarkets: RequestHandler = async (req, res) => {
  const markets = await Market.find();
  res.send(markets);
};
