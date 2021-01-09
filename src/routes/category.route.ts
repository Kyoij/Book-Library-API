import { Router } from "express";
import { addCategory, getAllCategory, getCategory, getTopCategory } from "../controllers/category.controller";

const categoryRoute = Router();

categoryRoute.get("/all", getAllCategory);

categoryRoute.get("/top", getTopCategory);

categoryRoute.post("/add", addCategory);

categoryRoute.get("/", getCategory);

export default categoryRoute;
