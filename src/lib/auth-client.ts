import { adminClient, organizationClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { telegramClient } from "telegram-better-auth"
import { env } from "@/env"

const authClient = createAuthClient({
  baseURL: env.VITE_BACKEND_URL,
  plugins: [
    adminClient(),
    organizationClient(),
    telegramClient(),
  ],
})

export const { useSession, signIn, signOut, signUp, getSession } = authClient
export default authClient

type ErrorMessages = Partial<Record<keyof typeof authClient.$ERROR_CODES, string>>

const errorMessages: ErrorMessages = {
  // Authentication & Session Errors
  USER_NOT_FOUND: "No account was found with that email address.",
  INVALID_PASSWORD: "The password you entered is incorrect.",
  INVALID_EMAIL_OR_PASSWORD: "The email or password you entered is incorrect.",
  SESSION_EXPIRED: "Your session has expired. Please sign in again.",
  INVALID_TOKEN: "Your session token is invalid. Please sign in again.",
  FAILED_TO_GET_SESSION: "There was a problem verifying your session. Please refresh the page.",
  FAILED_TO_CREATE_SESSION: "Could not sign you in at this time. Please try again later.",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "This account doesn't have a password. Try signing in with a social provider.",

  // User & Account Creation Errors
  USER_ALREADY_EXISTS: "An account with this email address already exists.",
  FAILED_TO_CREATE_USER: "We could not create your account. Please try again later.",
  PASSWORD_TOO_SHORT: "Your password must be at least 8 characters long.",
  PASSWORD_TOO_LONG: "Your password cannot be longer than 128 characters.",
  INVALID_EMAIL: "Please enter a valid email address.",
  USER_ALREADY_HAS_PASSWORD: "A password has already been set for this account.",

  // Social & Provider Errors
  SOCIAL_ACCOUNT_ALREADY_LINKED: "This social account is already linked to another user.",
  PROVIDER_NOT_FOUND: "This sign-in method is not available at the moment.",
  ID_TOKEN_NOT_SUPPORTED: "This social sign-in method is not configured correctly.",
  FAILED_TO_GET_USER_INFO: "Could not retrieve your profile information from the provider.",
  FAILED_TO_UNLINK_LAST_ACCOUNT: "You cannot remove your last remaining sign-in method.",

  // General & Update Errors
  FAILED_TO_UPDATE_USER: "Failed to update your profile. Please try again.",
  EMAIL_CAN_NOT_BE_UPDATED: "This email address cannot be changed.",
  USER_EMAIL_NOT_FOUND: "The specified email was not found.",
  ACCOUNT_NOT_FOUND: "Could not find the specified account.",
  EMAIL_NOT_VERIFIED: "Please verify your email address before signing in. Check your inbox.",
}

export function getAuthErrorMessage(code: string | undefined): string {
  if (code && code in errorMessages) {
    return errorMessages[code as keyof typeof errorMessages]!
  }
  return "An unexpected error occurred. Please try again."
}
