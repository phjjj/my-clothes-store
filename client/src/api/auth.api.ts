import { LoginProps } from "../pages/Login"
import { httpclient } from "./https"

export const login = async (data: LoginProps) => {
  const response = await httpclient.post("/users/login", data)
  return response
}
