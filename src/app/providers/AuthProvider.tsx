"use client"
import { useAppDispatch } from "@/store/hooks"
import { useEffect } from "react"
import { clearUser, setLoading, setUser } from "@/store/slices/authSlice"
import { getCurrentUser } from "@/shared/api/auth"

function AuthProvider({children}:{children:React.ReactNode}) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem("accessToken")

            if (!token) {
                dispatch(setLoading(false))
                return
            }

            try {
                const user = await getCurrentUser()
                dispatch(setUser(user))
                console.log("Session restored:", user)
            } catch (error) {
                localStorage.removeItem("accessToken")
                dispatch(clearUser())
                console.error("Session restore failed:", error)            }
        }
        checkAuth()
    },[dispatch])
    return children
}

export default AuthProvider