import { useNavigate } from "react-router-dom"
import { login } from "../api/auth.api"
import { LoginProps } from "../pages/Login"
import { useAuthStore } from "../store/authStore"
import { useAlert } from "./useAlert"

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
        }
      })
  }
  return { userLogin }
}
