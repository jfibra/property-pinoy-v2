"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Building, Users, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Property Management",
    href: "/admin/properties",
    icon: Building,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Button
              key={item.href}
              asChild
              variant={isActive ? "default" : "ghost"}
              className={cn("w-full justify-start", isActive && "bg-blue-600 hover:bg-blue-700")}
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4 mr-3" />
                {item.title}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
