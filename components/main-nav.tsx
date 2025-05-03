"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, User, FileText, Phone } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/student/dashboard",
      label: "Home",
      icon: Home,
      active: pathname === "/student/dashboard"
    },
    {
      href: "/student/reports",
      label: "Reports",
      icon: FileText,
      active: pathname === "/student/reports"
    },
    {
      href: "/student/emergency",
      label: "Emergency",
      icon: Phone,
      active: pathname === "/student/emergency"
    },
    
    {
      href: "/student/profile",
      label: "Profile",
      icon: User,
      active: pathname === "/student/profile"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-around items-center h-16 px-4 md:px-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex flex-col items-center justify-center h-full w-full text-xs transition-colors",
            route.active ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <route.icon className="h-5 w-5 mb-1" />
          <span>{route.label}</span>
        </Link>
      ))}
    </nav>
  )
}
