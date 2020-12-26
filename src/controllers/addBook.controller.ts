import { Request, Response } from "express";
import Book from "../models/book.model";

export default function addBookController(req: Request, res: Response) {
  new Book({ name: req.body.name, author: req.body.author, content: [] }).save().then(() => {
    res.json({ status: "ok", msg: "add book successful" });
  });
}
