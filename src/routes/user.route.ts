import { Router } from "express";
import { buyBook, userInfo, userLogin, userLogout, userRegister } from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticateToken.middleware";
import validateUserRegister from "../middlewares/validateUserRegister.middleware";

const userRoute = Router();

userRoute.get("/", authenticateToken, userInfo);

userRoute.post("/login", userLogin);

userRoute.get("/logout", authenticateToken, userLogout);

userRoute.post("/register", validateUserRegister, userRegister);

userRoute.post("/buy", authenticateToken, buyBook);

export default userRoute;
