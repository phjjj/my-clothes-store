import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET;
const accessTokenExpiry = "15m";
const refreshTokenExpiry = "7d";

// 액세스 토큰 생성
export const createAccessToken = (userId) => {
  return jwt.sign(userId, tokenSecret, accessTokenExpiry);
};

// 리프레시 토큰 생성
export const createRefreshToken = (userId) => {
  return jwt.sign(userId, tokenSecret, refreshTokenExpiry);
};

// 액세스 토큰 검증
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, accessTokenSecret);
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

// 리프레시 토큰 검증
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, refreshTokenSecret);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
