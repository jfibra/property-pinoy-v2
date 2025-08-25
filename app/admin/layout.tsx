import type React from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AuthProvider } from "@/components/auth/auth-provider"
import { requireAdmin } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Admin Dashboard - Property Pinoy",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 ml-64 p-6">{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}
