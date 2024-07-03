import axios, { AxiosRequestConfig } from "axios"
import { getToken } from "../store/authStore"

const BASE_URL = "http://localhost:7777"
const DEFAULT_TIMEOUT = 30000

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
      //   Authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
    withCredentials: true,
    ...config,
  })

  // 요청 인터셉터에서 동적으로 Authorization 헤더 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
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
      // retry는 config의 플래그로, 토큰 갱신 후 재요청을 방지하기 위해 사용
      // 예를 들어, 토큰 갱신 요청을 보내고, 그 요청이 실패했을 때 무한 루프에 빠지는 것을 방지
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true // 재요청 플래그 설정

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
          // axios.defaults.headers.common["Authorization"] 을 할 경우, 앞으로 모든 요청에 해당 헤더가 추가됨
          axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
          // originalRequest에 새로 갱신된 토큰을 추가하여 재요청
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

// 이렇게 할 경우 http 공통 모듈에서는 axiosInstance를 사용하게 된다. 와이리 어렵노
export const httpclient = createClient()
