// models/userModel.js
import { queryDB } from "../db/queryDB.js";

// 회원가입: 새로운 유저 추가
const createUser = async (user) => {
  const query = `
    INSERT INTO users (email, password, phone, address)
    VALUES (?, ?, ?, ?)`;

  const value = [user.email, user.password, user.phone, user.address];
  return await queryDB(query, value);
};

// 로그인: 이메일로 유저 정보 가져오기
const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users WHERE email = ?
  `;
  const value = [email];
  const users = await queryDB(query, value);
  return users[0];
};

export default { createUser, getUserByEmail };
