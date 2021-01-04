import { Router } from "express";
import { addCategory, getAllCategory, getCategory } from "../controllers/category.controller";

const categoryRoute = Router();

categoryRoute.get("/all", getAllCategory);

categoryRoute.post("/add", addCategory);

categoryRoute.get("/", getCategory);

export default categoryRoute;
