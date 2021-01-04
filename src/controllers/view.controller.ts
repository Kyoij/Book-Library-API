import { Request, Response } from "express";
import Category from "../models/category.model";

export function addCategoryView(req: Request, res: Response) {
  res.render("category");
}

export function addBookView(req: Request, res: Response) {
  Category.find()
    .then((categories) => {
      res.render("book", { categories: categories || [] });
    })
    .catch((err) => {
      res.send(err);
    });
}
