export type Roles = "owner" | "tenant" | "manager" | "accountant"

export interface User {
  user_id: string
  full_name: string
  default_role?: Roles
  allowed_roles: Roles[]
}
