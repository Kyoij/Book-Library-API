import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model";
import { secret } from "../config/index.config";
import JWT from "../models/JWT.model";
import bcrypt from "bcrypt";

export const userLogin = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return res.json({ status: "err", msg: "Wrong email or password" });
  let jti = await new JWT({}).save();
  let token = jwt.sign({ id: user.id, jti: jti._id }, secret);
  res.json({ status: "ok", payload: { authorization: token } });
};

export const userInfo = async (req: Request, res: Response) => {
  let user = await User.findOne({ _id: req.user.id }, "name email");
  if (!user) return res.json({ status: "err", msg: "User doesn't exist" });
  res.json({ status: "ok", payload: user });
};

export const userLogout = async (req: Request, res: Response) => {
  JWT.findByIdAndRemove(req.user.jti, (err, jwt_t) => {
    if (!jwt_t || err) return res.json({ status: "err", msg: "something wrong" });
    res.json({ status: "ok", msg: "logouted" });
  });
};

export const userRegister = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.json({ status: "err", msg: "Email already exists" });
  new User({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) }).save();
  res.json({ status: "ok", msg: "Register successful" });
};
