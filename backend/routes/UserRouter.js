// routes/userRoutes.js
import express from "express";
import { postSignUp, postLogin } from "../Controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/signup", postSignUp);
UserRouter.post("/login", postLogin);

export default UserRouter;
