"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { createBrowserSupabaseClient } from "@/lib/supabase"

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdminRole = async () => {

      if (loading) {
        return
      }

      if (!user) {
        router.push("/admin/login")
        return
      }

      try {
        const supabase = createBrowserSupabaseClient()
        const { data: userInfo, error } = await supabase
          .from("user_information")
          .select("user_types(type_name)")
          .eq("auth_user_id", user.id)
          .single<{ user_types?: { type_name?: string } }>()

        if (error) {
          router.push("/admin/login")
          return
        }
        if (!userInfo) {
          router.push("/admin/login")
          return
        }
        if (!userInfo.user_types) {
          router.push("/admin/login")
          return
        }
        if (!userInfo.user_types.type_name) {
          router.push("/admin/login")
          return
        }
        if (userInfo.user_types.type_name !== "Admin") {
          router.push("/admin/login")
          return
        }
        setIsAdmin(true)
      } catch (error) {
        console.error("[v0] Error checking admin role:", error)
        router.push("/admin/login")
        return
      } finally {
        setChecking(false)
      }
    }

    if (!loading) {
      checkAdminRole()
    }
  }, [user, loading, router])

  useEffect(() => {
    if (loading) {
      setChecking(true)
      setIsAdmin(null)
    }
  }, [loading])

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verifying access...</p>
          <p className="mt-1 text-xs text-gray-400">
            Loading: {loading.toString()}, Checking: {checking.toString()}
          </p>
        </div>
      </div>
    )
  }

  if (!user && !loading) {
    router.push("/admin/login")
    return null
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    router.push("/")
    return null
  }

  return <>{children}</>
}
