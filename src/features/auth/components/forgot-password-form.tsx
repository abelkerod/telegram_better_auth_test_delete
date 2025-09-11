// src/features/auth/forgot-password-form.tsx
"use client"

import { revalidateLogic } from "@tanstack/react-form"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import * as z from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppForm } from "@/lib/TanstackFormHook"

const forgotPasswordSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    otp: z.string().length(6, "The verification code must be 6 digits."),
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [otp, setOtp] = useState<string[]>(Array.from({ length: 6 }).fill("") as string[])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const navigate = useNavigate({ from: "/auth" })
  const { email: emailFromUrl = "" } = useSearch({ from: "/auth" })

  const form = useAppForm({
    defaultValues: {
      email: emailFromUrl,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationLogic: revalidateLogic({
      mode: "onChange",
      modeAfterSubmission: "submit",
    }),
    validators: {
      onDynamic: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      handlePasswordReset(value)
    },
  })

  useEffect(() => {
    const otpValue = otp.join("")
    form.setValue("otp", otpValue)
  }, [otp, form])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setResendDisabled(false)
            return 60
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [resendDisabled])

  const handleRequestOtp = async () => {
    const isEmailValid = await form.trigger("email")
    if (!isEmailValid) {
      form.setFocus("email")
      return
    }

    setResendDisabled(true)
    setError(null)
    try {
      // await emailOtp.sendVerificationOtp({
      //   email: form.getValues("email"),
      //   type: "forget-password",
      // })
      toast.info("OTP sent successfully. Please check your email.")
    }
    catch {
      setError("Failed to resend OTP. Please try again.")
      setResendDisabled(false)
      setCountdown(0)
    }
  }

  const handleVerifyOtp = async () => {
    const isOtpValid = await form.trigger("otp")
    if (!isOtpValid)
      return
    setIsOtpVerified(true)
  }

  const handlePasswordReset = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    try {
      // await emailOtp.resetPassword({
      //   email: data.email,
      //   otp: data.otp,
      //   password: data.newPassword,
      // })
      toast.success("Password has been reset successfully!")
      navigate({ search: prev => ({ ...prev, mode: "login" }) })
    }
    catch {
      setError("Failed to reset password. The code may be incorrect or expired.")
      setIsOtpVerified(false)
    }
    finally {
      setIsLoading(false)
    }
  }

  /* OTP helpers (unchanged) */
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value))
      return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5)
      inputRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(""))
      inputRefs.current[5]?.focus()
    }
  }

  const back = () => navigate({ search: prev => ({ ...prev, mode: "login" }) })

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={back} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-semibold tracking-tight">Reset your password</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        {isOtpVerified
          ? "Your code is verified. Please set your new password."
          : "Enter your email to receive a code, then verify it to proceed."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(handlePasswordReset)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...form.register("email")}
            disabled={isLoading || isOtpVerified}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        {!isOtpVerified
          ? (
              <div className="space-y-4 animate-in fade-in-50">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="otp-0">Verification Code</Label>
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={resendDisabled || isLoading}
                      className="text-sm font-medium text-primary hover:text-primary/90 disabled:text-muted-foreground disabled:cursor-not-allowed"
                    >
                      {resendDisabled ? `Resend in ${countdown}s` : "Send Code"}
                    </button>
                  </div>
                  <div className="flex justify-center space-x-2" onPaste={handleOtpPaste}>
                    {Array.from({ length: 6 }).map((_, index) => {
                      const uniqueKey = `otp-${index}`
                      return (
                        <Input
                          key={uniqueKey}
                          id={uniqueKey}
                          ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otp[index]}
                          onChange={e => handleOtpChange(index, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center text-lg"
                          disabled={isLoading}
                        />
                      )
                    })}
                  </div>
                  {form.formState.errors.otp && (
                    <p className="text-sm text-red-500">{form.formState.errors.otp.message}</p>
                  )}
                </div>
                <Button type="button" onClick={handleVerifyOtp} className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Code & Continue"}
                </Button>
              </div>
            )
          : (
              <div className="space-y-4 pt-2 animate-in fade-in-50">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...form.register("newPassword")}
                    disabled={isLoading}
                  />
                  {form.formState.errors.newPassword && (
                    <p className="text-sm text-red-500">{form.formState.errors.newPassword.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...form.register("confirmPassword")}
                    disabled={isLoading}
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </div>
            )}
      </form>
    </div>
  )
}
