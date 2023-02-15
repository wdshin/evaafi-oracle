import { RequestHandler } from "express";
import { User } from "../models/User";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.send(users);
};
