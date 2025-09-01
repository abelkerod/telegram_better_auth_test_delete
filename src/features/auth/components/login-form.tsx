import { revalidateLogic } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { AlertCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import * as z from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getAuthErrorMessage, signIn, signUp } from "@/lib/auth-client"
import { useAppForm } from "@/lib/TanstackFormHook"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate({ from: "/auth" })

  const form = useAppForm({
    defaultValues: { email: "", password: "" },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null)
      try {
        const { error } = await signIn.email({
          email: value.email,
          password: value.password,
        })
        if (error) {
          toast.error(getAuthErrorMessage(error.code))
          console.error(error)
          return
        }
        toast.success("Welcome back!")
        navigate({ search: prev => ({ ...prev, mode: undefined, email: undefined }) })
      }
      catch {
        toast.error("Failed to sign in.")
      }
    },
  })

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to sign in
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <form.AppField
          name="email"
          children={field => <field.FormInput label="Email" type="email" />}
        />
        <form.AppField
          name="password"
          children={field => <field.FormInput label="Password" type="password" />}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>
      <Button
        onClick={() => {
          signUp.email({
            name: "Abel Girma",
            email: "abelgirma@gmail.com",
            password: "abelgirma",
            fetchOptions: { credentials: "include" },
          })
        }}
      >
        Singup
      </Button>
    </div>
  )
}
