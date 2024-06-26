import { LoginProps } from "../pages/Login"
import { FormattedSignupProps } from "../pages/Signup"
import { httpclient } from "./https"

export const login = async (data: LoginProps) => {
  const response = await httpclient.post("/users/login", data)
  return response
}

export const signUp = async (data: FormattedSignupProps) => {
  const response = await httpclient.post("/users/signup", data)
  return response
}
