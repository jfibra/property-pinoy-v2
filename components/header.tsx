"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X, User } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createBrowserSupabaseClient } from "@/lib/supabase"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const supabase = createBrowserSupabaseClient()

          const { data: userInfo } = await supabase
            .from("user_information")
            .select("user_types(type_name)")
            .eq("auth_user_id", user.id)
            .single()

          setIsAdmin(userInfo?.user_types?.type_name === "Admin")
        } catch (error) {
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
    }

    if (!loading) {
      checkAdminStatus()
    }
  }, [user, loading])

  const handleLogout = async () => {
    try {
      await signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
      try {
        const supabase = createBrowserSupabaseClient()
        await supabase.auth.signOut()
        window.location.href = "/"
      } catch (fallbackError) {
        console.error("Fallback logout error:", fallbackError)
      }
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Property Pinoy" width={200} height={60} className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-gray-900 font-medium">
              Find A Property
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild className="bg-gray-900 hover:bg-gray-800">
              <Link href="/properties/new">List Your Property</Link>
            </Button>

            {isAdmin && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.email?.charAt(0).toUpperCase() || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="/properties" className="text-gray-700 hover:text-gray-900 font-medium">
                Find A Property
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                Contact
              </Link>
              <Button asChild className="bg-gray-900 hover:bg-gray-800 w-fit">
                <Link href="/properties/new">List Your Property</Link>
              </Button>

              {isAdmin && user && (
                <>
                  <Link href="/admin" className="text-gray-700 hover:text-gray-900 font-medium">
                    Admin Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900 font-medium text-left">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
