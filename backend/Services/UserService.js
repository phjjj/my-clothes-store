// services/userService.js
import bcrypt from "bcrypt";
import UserModel from "../Models/UserModel.js";
import jwt from "../Utils/jwt.js";

const registerUser = async (user) => {
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  return await UserModel.createUser(user);
};

const loginUser = async (email, password) => {
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  // 비밀번호 검증
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.createAccessToken(user.id);
  const refreshToken = jwt.createRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export default { registerUser, loginUser };
