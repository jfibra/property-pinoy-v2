"use client"

import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth/auth-provider"

export function AdminHeader() {
  const router = useRouter()
  const { toast } = useToast()
  const { signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()

      toast({
        title: "Logged out successfully",
        description: "You have been signed out of the admin panel",
      })

      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="Property Pinoy" width={120} height={40} />
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>Administrator</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
