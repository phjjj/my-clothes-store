// controllers/userController.js
import UserService from "../services/UserService.js";

// 회원가입 컨트롤러
const postSignUp = async (req, res) => {
  try {
    const user = req.body;
    await UserService.registerUser(user);
    res.status(201).json({ message: "회원가입 완료" });
  } catch (error) {
    res.status(500).json({ message: "회원가입 실패", error: error.message });
  }
};

// 로그인 컨트롤러
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser(email, password);
    res.status(200).json({ message: "로그인 성공", user });
  } catch (error) {
    res.status(400).json({ message: "로그인 실패", error: error.message });
  }
};

export { postSignUp, postLogin };
