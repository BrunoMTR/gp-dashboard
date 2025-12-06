import { useEffect } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "../store/AuthContext"
import { LoginForm } from "@/components/Auth/login-form"



export const Route = createFileRoute("/login")({
  component: Login,

})


export default function Login() {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()


  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/app/processes" })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
