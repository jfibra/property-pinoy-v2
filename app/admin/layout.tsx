import type { Metadata } from "next"
import type React from "react"

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
