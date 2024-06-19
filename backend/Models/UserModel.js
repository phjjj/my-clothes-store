// models/userModel.js
import { queryDB } from "../db/queryDB.js";

const createUser = async (user) => {
  const query = `
    INSERT INTO users (email, password, phone, address)
    VALUES (?, ?, ?, ?)`;

  const value = [user.email, user.password, user.phone, user.address];
  return await queryDB(query, value);
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users WHERE email = ?
  `;
  const value = [email];
  const users = await queryDB(query, value);
  return users[0];
};

export default { createUser, getUserByEmail };
