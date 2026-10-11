export type UserRole = "admin" | "user" | "doctor"

export interface User {
    id: number
    name: string
    surname: string
    birthdate: string | null
    phone: string
    city: string | null
    email: string
    role: UserRole
    created_at: string
    updated_at: string
}