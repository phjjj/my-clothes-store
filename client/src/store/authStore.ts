import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  setToken: (value: string) => void
}
export const getToken = () => {
  const token = localStorage.getItem("token")
  return token
}

const setToken = (token: string) => {
  localStorage.setItem("token", token)
}

export const removeToken = () => {
  localStorage.removeItem("token")
}

export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      setToken: (value) => {
        setToken(value)
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
