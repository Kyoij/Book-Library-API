import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import Category from "../models/category.model";
import { Types } from "mongoose";

export function addCategory(req: Request, res: Response) {
  if (!req.body.name || !req.body.description || !req.body.image)
    return res.json({ status: "err", msg: "add category unsuccessful" });
  new Category({ name: req.body.name, image: req.body.image, description: req.body.description }).save();
  res.json({ status: "ok", msg: "add category successful" });
}

export function getAllCategory(req: Request, res: Response) {
  Category.find({})
    .then((categories) => {
      res.json({ status: "ok", payload: categories });
    })
    .catch(() => {
      res.json({ status: "err" });
    });
}

export function getTopCategory(req: Request, res: Response) {
  Category.find()
    .sort({ count: -1 })
    .limit(10)
    .then((categories) => {
      res.json({ status: "ok", payload: categories });
    })
    .catch(() => {
      res.json({ status: "err" });
    });
}

export function getCategory(req: Request, res: Response) {
  console.log(req.query.id);
  Book.find({ categories: Types.ObjectId(req.query.id as string) })
    .then((books: any) => {
      res.json({ status: "ok", payload: books });
    })
    .catch(() => {
      res.json({ status: "err", msg: "not found" });
    });
}
