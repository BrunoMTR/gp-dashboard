import { useMutation } from '@tanstack/react-query'
import { login, logout } from '../../services/auth.service'
import type { User } from '../../api/Auth/types'

export function useUserLogin() {
  return useMutation({
    mutationFn: (user: User) => login(user),
  })
}

export function useUserLogout() {
  return useMutation({
    mutationFn: () => logout(),
  })
}
