import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (state) => set({ isLoggedIn: state }),
    }),
    {
      name: "auth-storage",
    }
  )
)
