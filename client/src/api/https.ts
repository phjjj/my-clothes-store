import axios, { AxiosRequestConfig } from "axios"
import { getToken } from "../store/authStore" // 토큰 관리 함수 임포트

const BASE_URL = "http://localhost:7777"
const DEFAULT_TIMEOUT = 30000

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  })

  // 요청 인터셉터에서 동적으로 Authorization 헤더 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        console.log(token)
        config.headers["Authorization"] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 응답 인터셉터에서 토큰 갱신 로직 추가
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },

    async (error) => {
      const originalRequest = error.config

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const refreshTokenResponse = await axios.post(
            "http://localhost:7777/refresh-token",
            {},
            {
              withCredentials: true,
            }
          )

          const newAccessToken = refreshTokenResponse.headers.authorization.split(" ")[1]
          localStorage.setItem("token", newAccessToken)
          axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`

          return axiosInstance(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

// httpclient 인스턴스 생성
export const httpclient = createClient()
