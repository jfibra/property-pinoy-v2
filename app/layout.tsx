import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/auth-provider"
// Footer visibility logic moved to ClientFooterWrapper below

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Property Pinoy - Find Your Dream Property in the Philippines",
  description:
    "Browse thousands of property listings in the Philippines. Find your perfect home, condo, or investment property. List your property with us and reach thousands of buyers.",
  keywords: [
    "Philippines real estate",
    "property for sale Philippines",
    "houses for sale",
    "condos for sale",
    "Manila properties",
    "Cebu properties",
    "property listings",
    "real estate Philippines",
  ],
  authors: [{ name: "Property Pinoy" }],
  creator: "Property Pinoy",
  publisher: "Property Pinoy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://propertypinoy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Property Pinoy - Find Your Dream Property in the Philippines",
    description:
      "Browse thousands of property listings in the Philippines. Find your perfect home or list your property with us.",
    url: "https://propertypinoy.com",
    siteName: "Property Pinoy",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Property Pinoy - Real Estate Philippines",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Pinoy - Find Your Dream Property in the Philippines",
    description:
      "Browse thousands of property listings in the Philippines. Find your perfect home or list your property with us.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}


function ClientFooterWrapper() {
  // Only render the footer if not in /admin route
  if (typeof window === "undefined") return null;
  const pathname = window.location.pathname;
  if (pathname.startsWith("/admin")) return null;
  return <Footer />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <ClientFooterWrapper />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
