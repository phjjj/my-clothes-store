import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const registerUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  return await UserModel.createUser(user);
};

const loginUser = async (email, password) => {
  const user = await UserModel.getUserByEmail(email);

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  await UserModel.saveRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken };
};

const checkRefreshToken = async (oldRefreshToken) => {
  let userId;
  try {
    const decoded = jwt.verifyRefreshToken(oldRefreshToken);
    userId = decoded.userId;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  // DB에 저장된 refresh token과 비교
  const savedRefreshToken = await UserModel.getRefreshToken(userId);

  // 저장된 refresh token과 요청한 refresh token이 다르면 에러 발생
  if (oldRefreshToken !== savedRefreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = jwt.createAccessToken(userId);
  const newRefreshToken = jwt.createRefreshToken(userId);

  // 새로운 refresh token으로 갱신
  await UserModel.saveRefreshToken(userId, newRefreshToken);

  return { newAccessToken, newRefreshToken };
};

// 유저 정보 조회
const getUser = async (userId) => {
  return await UserModel.getUserById(userId);
};

export default { registerUser, loginUser, checkRefreshToken, getUser };
