import userService from "../services/userService.js"
import StatusCodes from "http-status-codes"

const postSignUp = async (req, res) => {
  try {
    const user = req.body
    await userService.registerUser(user)
    res.status(StatusCodes.CREATED).json({ message: "회원가입 완료" })
  } catch (error) {
    if (error.errno === 1062) {
      return res.status(StatusCodes.CONFLICT).json({ message: "중복된 이메일입니다." })
    }
    res.status(StatusCodes.BAD_REQUEST).json({ message: "회원가입 실패", error: error.message })
  }
}

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const { accessToken, refreshToken } = await userService.loginUser(email, password)

    res.setHeader("Authorization", `Bearer ${accessToken}`)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // https에서만 쿠키 전송
      sameSite: "strict", // 같은 사이트에서만 쿠키 전송
    })

    res.status(StatusCodes.OK).json({ message: "로그인 성공" })
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인 실패", error: error.message })
  }
}

// refreshToken을 사용해 accessToken을 갱신하는 컨트롤러
const postRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    const tokens = await userService.checkRefreshToken(refreshToken)

    res.setHeader("Authorization", `Bearer ${tokens.newAccessToken}`)
    res.cookie("refreshToken", tokens.newRefreshToken, {
      httpOnly: true,
      secure: true, // https에서만 쿠키 전송
      sameSite: "strict", // 같은 사이트에서만 쿠키 전송
    })

    res.status(StatusCodes.OK).json({ message: "토큰 갱신 성공" })
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "refreshToken 만료", error: error.message })
  }
}

// 유저 정보 조회
const getUser = async (req, res) => {
  try {
    const userId = req.user.uid
    const user = await userService.getUser(userId)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "유저 조회 실패", error: error.message })
  }
}

export { postSignUp, postLogin, postRefreshToken, getUser }
