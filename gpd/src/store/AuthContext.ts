import { create } from "zustand"
import type { AuthState, User } from "../api/Auth/types"
import { login, logout, checkAuth } from "../services/auth.service"

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (user: User) => {
    const response = await login(user)
    // response.data é o objeto User vindo da API
    set({ user: response.data, isAuthenticated: true })
  },

  logout: async () => {
    await logout()
    set({ user: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    try {
      const response = await checkAuth()
      set({ user: response.data, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    }
  },
}))
