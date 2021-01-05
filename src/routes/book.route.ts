import { Router } from "express";
import { addBook, addChapter, getAllBook, getBook, getChapter } from "../controllers/book.controller";
import authenticateToken from "../middlewares/authenticateToken.middleware";

const bookRoute = Router();

bookRoute.get("/all", authenticateToken, getAllBook);

bookRoute.post("/add", addBook);

bookRoute.post("/addchapter", addChapter);

bookRoute.get("/chapter/:id", authenticateToken, getChapter);

bookRoute.get("/:id", authenticateToken, getBook);

export default bookRoute;
