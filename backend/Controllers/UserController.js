import UserService from "../services/UserService.js";
import jwt from "../Utils/jwt.js";
import StatusCodes from "http-status-codes";
// 회원가입 컨트롤러
const postSignUp = async (req, res) => {
  try {
    const user = req.body;
    await UserService.registerUser(user);
    res.status(StatusCodes.CREATED).json({ message: "회원가입 완료" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "회원가입 실패", error: error.message });
  }
};

// 로그인 컨트롤러
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await UserService.loginUser(
      email,
      password
    );

    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // JS로 쿠키 접근 불가
      //secure: true, // https에서만 쿠키 전송
      sameSite: "none", // 다른 도메인에서도 쿠키 전송
    });

    res.status(StatusCodes.OK).json({ message: "로그인 성공" });
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 실패", error: error.message });
  }
};

export { postSignUp, postLogin };
