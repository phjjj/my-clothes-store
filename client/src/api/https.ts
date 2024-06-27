import axios, { AxiosRequestConfig } from "axios"

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

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error) // 에러를 다시 던져준다.
    }
  )

  return axiosInstance
}

// 이렇게 할 경우 http 공통 모듈에서는 axiosInstance를 사용하게 된다. 와이리 어렵노
export const httpclient = createClient()
