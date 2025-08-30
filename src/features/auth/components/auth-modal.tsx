import { useSearch } from "@tanstack/react-router"
import ForgotPasswordForm from "./forgot-password-form"
import LoginForm from "./login-form"

export type ModalType = "signUp" | "login" | "otp" | "forgotPassword"

export default function AuthModal() {
  const { mode } = useSearch({ from: "/auth" })
  return (
    <div>
      {mode === "login" && <LoginForm />}
      {
        mode === "forgotPassword" && (
          <ForgotPasswordForm />
        )
      }
    </div>
  )
}
