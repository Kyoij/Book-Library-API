import { Router } from "express";
import addBookController from "../controllers/addBook.controller";
import addChapterController from "../controllers/addChapter.controller";
import getAllBookController from "../controllers/getAllBooks.controller";
import getBookController from "../controllers/getBook.controller";

const bookRoute = Router();

bookRoute.get("/", getAllBookController);
bookRoute.post("/add", addBookController);
bookRoute.post("/addchapter", addChapterController);
bookRoute.get("/:id", getBookController);

export default bookRoute;
