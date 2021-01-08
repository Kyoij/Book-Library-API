import { Router } from "express";
import {
  addBook,
  addChapter,
  getAllBook,
  getBook,
  getChapter,
  getNewBooks,
  getRecommeded,
} from "../controllers/book.controller";
import authenticateToken from "../middlewares/authenticateToken.middleware";

const bookRoute = Router();

bookRoute.get("/all", authenticateToken, getAllBook);

bookRoute.post("/add", addBook);

bookRoute.get("/new", authenticateToken, getNewBooks);

bookRoute.get("/top", authenticateToken, getRecommeded);

bookRoute.post("/addchapter", addChapter);

bookRoute.get("/chapter/:id", authenticateToken, getChapter);

bookRoute.get("/:id", authenticateToken, getBook);

export default bookRoute;
