import { BookDocument } from "./../models/book.model";
import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";

export default function getBookController(req: Request, res: Response, next: NextFunction) {
  Book.findOne({ _id: req.params.id }, (err, book: BookDocument) => {
    if (!book) return next();
    res.json(book);
  });
}
