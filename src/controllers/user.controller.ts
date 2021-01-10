import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model";
import { secret } from "../config/index.config";
import JWT from "../models/JWT.model";
import bcrypt from "bcrypt";
import Book from "../models/book.model";
import LastRead from "../models/lastRead.model";

export const userLogin = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return res.json({ status: "err", msg: "Wrong email or password" });
  let jti = await new JWT({}).save();
  let token = jwt.sign({ id: user.id, jti: jti._id }, secret);
  res.json({ status: "ok", payload: { authorization: token } });
};

export const userInfo = async (req: Request, res: Response) => {
  let user = await User.findOne({ _id: req.user.id }, "name email balance books");
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

export const buyBook = (req: Request, res: Response) => {
  Book.findById(req.body.bookId)
    .then((book) => {
      if (!book) return res.json({ status: "err", msg: "bookId not found" });
      User.findById(req.user.id).then((user) => {
        if (user!.balance < book.price) return res.json({ status: "err", msg: "insufficient balance" });
        if (user!.books.includes(req.body.bookId))
          return res.json({ status: "err", msg: "user already have this book" });
        user!.books.push(Types.ObjectId(req.body.bookId));
        user!.balance -= book.price;
        book.bought++;
        book.save();
        new LastRead({ userId: user?._id, bookId: book._id }).save();
        user!.save().then(() => {
          res.json({ status: "ok", msg: "buy book successful" });
        });
      });
    })
    .catch(() => {
      res.json({ status: "err", msg: "bookId not found" });
    });
};
