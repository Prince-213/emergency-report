"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  department: string
  regNo: string
  healthInfo: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

// Mock user data
const MOCK_USER: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@university.edu",
  department: "Computer Science",
  regNo: "CS2023001",
  healthInfo: "No known allergies, Blood type: O+",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

/*   useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      if (!user && pathname !== "/student/login" && pathname !== "/student/register") {
        router.push("/student/login")
      } else if (
        user &&
        (pathname === "/student/login" || pathname === "/student/register")
      ) {
        router.push("/student/dashboard");
      }
    }
  }, [user, isLoading, pathname, router]) */



  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
