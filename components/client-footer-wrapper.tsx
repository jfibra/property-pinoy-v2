"use client";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";

export function ClientFooterWrapper() {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <Footer />;
  if (pathname.startsWith("/admin")) return null;
  return <Footer />;
}
