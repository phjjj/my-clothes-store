import { useNavigate } from "react-router-dom"
import { login, signUp } from "../api/auth.api"
import { LoginProps } from "../pages/Login"
import { useAuthStore } from "../store/authStore"
import { useAlert } from "./useAlert"
import { FormattedSignupProps } from "../pages/Signup"

export const useAuth = () => {
  const { setIsLoggedIn } = useAuthStore()
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const userLogin = (data: LoginProps) => {
    login(data)
      .then(() => {
        setIsLoggedIn(true)
        navigate("/")
      })
      .catch((err) => {
        if (err.response.status === 401) {
          showAlert("아이디 또는 비밀번호가 일치하지 않습니다.")
        } else {
          showAlert("로그인에 실패했습니다.")
        }
      })
  }

  const userSignUp = (data: FormattedSignupProps) => {
    signUp(data)
      .then(() => {
        showAlert("회원가입이 완료되었습니다. 로그인해주세요.")
        navigate("/login")
      })
      .catch((err) => {
        if (err.response.status === 409) {
          showAlert("이미 존재하는 이메일입니다.")
        } else {
          showAlert("회원가입에 실패했습니다.")
        }
      })
  }
  return { userLogin, userSignUp }
}
