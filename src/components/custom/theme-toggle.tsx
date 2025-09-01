import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"
import { useTheme } from "@/lib/context/theme-context"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  // Update theme-color meta tag when theme is updated
  useEffect(() => {
    const themeColor = theme === "dark" ? "#020817" : "#fff"
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor)
      metaThemeColor.setAttribute("content", themeColor)
  }, [theme])

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-zinc-950 border border-zinc-800"
          : "bg-white border border-zinc-200",
        className,
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "transform translate-x-0 bg-zinc-800"
              : "transform translate-x-8 bg-gray-200",
          )}
        >
          {isDark
            ? (
              <Moon
                className="size-4 text-white"
                strokeWidth={1.5}
              />
            )
            : (
              <Sun
                className="size-4 text-gray-700"
                strokeWidth={1.5}
              />
            )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "bg-transparent"
              : "transform -translate-x-8",
          )}
        >
          {isDark
            ? (
              <Sun
                className="size-4 text-gray-500"
                strokeWidth={1.5}
              />
            )
            : (
              <Moon
                className="size-4 text-black"
                strokeWidth={1.5}
              />
            )}
        </div>
      </div>
    </div>
  )
}
