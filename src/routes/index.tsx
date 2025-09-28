import type { TelegramUser } from "@/features/auth/components/TelegramLoginButton"
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { env } from "@/env"
import TelegramLoginButton from "@/features/auth/components/TelegramLoginButton"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const handleTelegramAuth = (user: TelegramUser) => {
    console.log("Telegram auth data:", user)
    // Here you can send the authentication data to your backend
    // or store it in your state management
  }

  return (
    <div>
      <TelegramLoginButton
        botName={env.VITE_TELEGRAM_BOT_NAME}
        dataOnauth={handleTelegramAuth}
      />
      <Button onClick={() => { }}>
        login with telegram
      </Button>
    </div>
  )
}
