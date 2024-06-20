import { verifyAccessToken } from "../utils/jwtUtils.js";
import StatusCodes from "http-status-codes";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyAccessToken(token);
      req.user = decoded; // 다음 미들웨어에서 사용할 수 있도록 req 객체에 사용자 정보를 저장
      next();
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED) // 401을 반환하고 클라이언트에서는 리프레시 토큰을 사용해 액세스 토큰을 갱신하도록 요청
        .json({ message: "Invalid or expired access token" });
    }
  } else {
    return res
      .status(StatusCodes.FORBIDDEN) // 로그인이 필요한 페이지에 접근할 때 403을 반환하고 클라이언트에서는 로그인 페이지로 이동하도록 요청
      .json({ message: "Authorization header missing" });
  }
};

export default authenticateJWT;
