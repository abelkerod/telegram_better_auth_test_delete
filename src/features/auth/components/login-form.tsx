import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { AlertCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAuthErrorMessage, signIn } from "@/lib/auth-client"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})
type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate({ from: "/auth" })
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
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
    finally {
      setIsLoading(false)
    }
  }

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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...form.register("email")}
            disabled={isLoading}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            disabled={isLoading}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in…" : "Sign In"}
        </Button>
      </form>

    </div>
  )
}
