// routes/userRoutes.js
import express from "express";
import {
  postSignUp,
  postLogin,
  getUser,
} from "../Controllers/UserController.js";
import authenticateJWT from "../middleware/authMiddleware.js";
const UserRouter = express.Router();

UserRouter.post("/signup", postSignUp);
UserRouter.post("/login", postLogin);
// 유저 정보 조회
UserRouter.get("/info", authenticateJWT, getUser);

export default UserRouter;
