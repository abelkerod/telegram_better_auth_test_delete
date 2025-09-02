import { useRouter } from "@tanstack/react-router"
import { ChevronDown, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useSidebar } from "@/components/ui/sidebar"
import { signOut, useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

function getNameInitials(fullName: string | null | undefined): string {
  if (!fullName)
    return "?"
  const names = fullName.trim().split(/\s+/)
  if (names.length === 0 || names[0] === "")
    return "?"
  if (names.length === 1)
    return names[0].charAt(0).toUpperCase()
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

export function ProfileDropdown() {
  const router = useRouter()
  const { data: session, isPending: isLoadingSession } = useSession()
  const userFullName = isLoadingSession ? "" : session?.user.name

  const handleLogout = async () => {
    signOut()
    await router.invalidate()
  }

  const { state } = useSidebar()

  return (

    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {state === "collapsed"
          ? (
              <Button
                variant="ghost"
                className={cn(
                  "group size-9 p-0",
                  "hover:bg-accent/50 transition-colors duration-200",
                  "rounded-lg border border-transparent hover:border-border/50",
                )}
              >
                <div className="relative">
                  <Avatar className="size-9 border-2 border-primary/10 dark:border-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 font-medium text-primary-foreground">
                      {getNameInitials(userFullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className=" absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-green-500">
                    <div className="size-2 rounded-full bg-background" />
                  </div>
                </div>
              </Button>
            )
          : (
              <Button
                variant="ghost"
                className={cn(
                  "group h-auto w-full justify-start gap-3 p-3 text-left",
                  "hover:bg-accent/50 transition-colors duration-200",
                  "rounded-lg border border-transparent hover:border-border/50",
                )}
              >
                <div className="relative">
                  <Avatar className="size-9 border-2 border-primary/10 dark:border-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 font-medium text-primary-foreground">
                      {getNameInitials(userFullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className=" absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-green-500">
                    <div className="size-2 rounded-full bg-background" />
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">
                    {userFullName}
                  </p>
                </div>

                <ChevronDown
                  className={cn(
                    "ml-auto size-4 shrink-0 text-muted-foreground",
                    "transition-transform duration-200",
                    "group-data-[state=open]:rotate-180",
                  )}
                />
              </Button>
            )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount sideOffset={8}>
        <DropdownMenuLabel className="px-4 py-3 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border-2 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                {getNameInitials(userFullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userFullName}</p>
              <p className="text-xs text-muted-foreground"></p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="flex justify-between px-4 py-2 text-sm"
        >
          Change Theme
          <ThemeToggle />
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onSelect={handleLogout}
          className="px-4 py-2 text-sm text-red-600 focus:bg-red-50/50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-900/20"
        >
          <LogOut className="mr-3 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
