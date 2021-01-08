import { NextFunction, Request, Response } from "express";
import Category from "../models/category.model";

export function addCategory(req: Request, res: Response) {
  if (!req.body.name || !req.body.description || !req.body.image)
    return res.json({ status: "err", msg: "add category unsuccessful" });
  new Category({ name: req.body.name, image: req.body.image, description: req.body.description }).save();
  res.json({ status: "ok", msg: "add category successful" });
}

export function getAllCategory(req: Request, res: Response) {
  Category.find({})
    .then((categorys) => {
      res.json({ status: "ok", payload: categorys });
    })
    .catch(() => {
      res.json({ status: "err" });
    });
}

export function getCategory(req: Request, res: Response) {
  Category.findById(req.query.id)
    .then((category) => {
      if (category) return res.json({ status: "ok", payload: category });
      res.json({ status: "err", msg: "not found" });
    })
    .catch(() => {
      res.json({ status: "err", msg: "not found" });
    });
}
