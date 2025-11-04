export interface User {
  username: string
  role?: string,
  password?: string

}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}
