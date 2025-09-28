import React, { useEffect, useRef } from "react"

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
  lang?: string
}

interface TelegramLoginButtonProps {
  botName: string // Your Telegram bot username (without @)
  dataOnauth?: (user: TelegramUser) => void // Callback function when user logs in
  dataAuthUrl?: string // URL to redirect to after auth (instead of callback)
  buttonSize?: "large" | "medium" | "small" // Button size: large (default), medium, small
  cornerRadius?: number // Button corner radius in pixels
  requestAccess?: "write" | string // Request permission to send messages (default: 'write')
  usePic?: boolean // Show user's profile picture on button (default: true)
  lang?: string // Widget language (default: 'en')
  widgetVersion?: number // Telegram widget version (default: 22)
  className?: string // CSS class for container div
  children?: React.ReactNode // Child elements (rarely used)
}

const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({
  botName,
  dataOnauth,
  dataAuthUrl,
  buttonSize = "large",
  cornerRadius,
  requestAccess = "write",
  usePic = true,
  lang = "en",
  widgetVersion = 22,
  className,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current)
      return

    // Create global callback function
    if (dataOnauth) {
      (window as any).TelegramLoginWidget = {
        dataOnauth: (user: TelegramUser) => dataOnauth(user),
      }
    }

    // Create script element
    const script = document.createElement("script")
    script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`
    script.async = true
    script.setAttribute("data-telegram-login", botName)
    script.setAttribute("data-size", buttonSize)
    script.setAttribute("data-request-access", requestAccess)
    script.setAttribute("data-userpic", usePic.toString())
    script.setAttribute("data-lang", lang)

    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString())
    }

    if (dataAuthUrl) {
      script.setAttribute("data-auth-url", dataAuthUrl)
    }
    else if (dataOnauth) {
      script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)")
    }

    // Clear container and append script
    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(script)

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
      if ((window as any).TelegramLoginWidget?.dataOnauth === dataOnauth) {
        delete (window as any).TelegramLoginWidget
      }
    }
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, lang, widgetVersion, dataOnauth, dataAuthUrl])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export default TelegramLoginButton
