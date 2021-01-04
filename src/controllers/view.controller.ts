import { Request, Response } from "express";
import Book from "../models/book.model";
import Category from "../models/category.model";

export function addCategoryView(req: Request, res: Response) {
  res.render("category");
}

export function addBookView(req: Request, res: Response) {
  Category.find()
    .then((categories) => {
      res.render("book", {
        categories: categories.map((category) => ({ name: category.name, _id: category._id })),
      });
    })
    .catch(res.send);
}

export function addChapterView(req: Request, res: Response) {
  Book.find()
    .then((books) => {
      res.render("chapter", { books: books.map((book) => ({ name: book.name, _id: book._id })) });
    })
    .catch(res.send);
}
