import { createFileRoute, redirect, useNavigate, useSearch } from "@tanstack/react-router"
import z from "zod"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import AuthModal from "@/features/auth/components/auth-modal"

const searchSchema = z.object({
  mode: z.enum(["signUp", "login", "otp", "forgotPassword"]).optional(),
  email: z.string().optional(),
})

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  validateSearch: searchSchema,
  beforeLoad: async ({ search }) => {
    // Redirect to "/" if no search parameters are provided
    if (!Object.keys(search).length) {
      throw redirect({ to: "/" })
    }
  },
  // beforeLoad: async ({ context, search }) => {
  //   const result = searchSchema.safeParse(search)
  //   if (context.auth.isLoading) return
  //   const isAuthenticated = context.auth.isAuthenticated
  //
  //   // Redirect if search params are invalid or mode is missing
  //   if (!result.success || !search.mode)
  //     throw redirect({ to: "/" })
  //
  //   // Redirect if mode is 'otp' but email is missing
  //   if (search.mode === "otp" && !search.email)
  //     throw redirect({ to: "/" })
  //
  //   // Allow only 'otp' mode for authenticated users
  //   if (isAuthenticated && search.mode !== "otp") {
  //     throw redirect({ to: "/" })
  //   }
  // },
})

function RouteComponent() {
  const navigate = useNavigate({ from: "/auth" })
  const { mode } = useSearch({ from: "/auth" })

  const allowedModes = ["signUp", "login", "otp", "forgotPassword"]

  const close = () => navigate({ search: {} })
  return (
    <Dialog open={allowedModes.includes(mode!)} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <AuthModal />
      </DialogContent>
    </Dialog>
  )
}
