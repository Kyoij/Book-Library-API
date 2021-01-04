import { Router } from "express";
import { addBookView, addCategoryView, addChapterView } from "../controllers/view.controller";

const viewRoute = Router();

viewRoute.get("/category", addCategoryView);

viewRoute.get("/book", addBookView);

viewRoute.get("/chapter", addChapterView);

export default viewRoute;
