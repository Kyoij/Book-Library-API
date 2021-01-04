import { Router } from "express";
import { addBookView, addCategoryView } from "../controllers/view.controller";

const viewRoute = Router();

viewRoute.get("/category", addCategoryView);

viewRoute.get("/book", addBookView);

export default viewRoute;
