"use client"
import type React from "react"
import { usePathname } from "next/navigation"
import { AdminAuthGuard } from "@/components/admin/admin-auth-guard"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div>{children}</div>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 ml-64 p-6">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
