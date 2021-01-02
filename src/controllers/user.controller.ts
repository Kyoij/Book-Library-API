import JWTR from "jwt-redis";
import redis from "redis";
import { Request, Response } from "express";
import User from "../models/user.model";
import { secret } from "../config/index.config";

const client = redis.createClient();
// client.on("error", (e) => console.log(e));

const jwtr = new JWTR(client);

export const userLogin = async (req: Request, res: Response) => {
  let user = await User.findOne(req.body, "name email");
  if (!user) return res.json({ status: "err", msg: "Wrong email or password" });
  let token = await jwtr.sign({ id: user.id }, secret, { expiresIn: "10h" });
  res.json({ status: "ok", payload: { authorization: token } });
};

export const userInfo = async (req: Request, res: Response) => {
  let user = await User.findOne({ _id: req.user.id }, "name email");
  if (!user) return res.json({ status: "err", msg: "User doesn't exist" });
  res.json({ status: "ok", payload: user });
};

export const userLogout = (req: Request, res: Response) => {
  console.log(req.user);
  jwtr.destroy(req.user.jti).then((result) => {
    if (result) res.json({ status: "ok", msg: "logouted" });
    else res.json({ status: "err", msg: "something wrong" });
  });
};

export const userRegister = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.json({ status: "err", msg: "Email already exists" });
  new User(req.body).save();
  res.json({ status: "ok", msg: "Register successful" });
};
