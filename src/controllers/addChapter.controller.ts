import { BookDocument } from "./../models/book.model";
import { Response, Request } from "express";
import Book from "../models/book.model";

export default function addChapterController(req: Request, res: Response) {
  Book.findOne({ _id: req.body.bookid }, (err, book: BookDocument) => {
    book.content.push({ name: req.body.name, content: req.body.content });
    book.save().then(() => {
      res.json({ status: "ok", msg: "add chapter successful" });
    });
  });
}
