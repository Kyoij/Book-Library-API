import { Router } from "express";
import { addBook, addChapter, getAllBook, getBook } from "../controllers/book.controller";

const bookRoute = Router();

bookRoute.get("/all", getAllBook);

bookRoute.post("/add", addBook);

bookRoute.post("/addchapter", addChapter);

bookRoute.get("/:id", getBook);

export default bookRoute;
