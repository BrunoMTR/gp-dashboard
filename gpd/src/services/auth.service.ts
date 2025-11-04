import axiosInstance from "@/lib/axios"
import type { User } from "../api/Auth/types"

const AUTH_PATH = "/users" // o mesmo prefixo que usas no backend

export async function login(user: User) {
  const response = await axiosInstance.post(`${AUTH_PATH}/login`, user)
  return response.data
}

export async function logout() {
  const response = await axiosInstance.post(`${AUTH_PATH}/logout`, null)
  return response.data
}

export async function checkAuth() {
  const response = await axiosInstance.get(`${AUTH_PATH}/me`)
  return response.data
}
