// services/userService.js
import bcrypt from "bcrypt";
import UserModel from "../Models/UserModel.js";

// 회원가입 서비스
const registerUser = async (user) => {
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  // 새로운 유저 생성
  return await UserModel.createUser(user);
};

// 로그인 서비스
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

  return user;
};

export default { registerUser, loginUser };
