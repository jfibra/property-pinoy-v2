import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image src="/images/logo.png" alt="Property Pinoy" width={150} height={75} className="mx-auto" />
        </div>

        {/* 404 Illustration */}
        <div className="mb-8 relative">
          <div className="text-8xl font-bold text-blue-200 mb-4">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the property you're looking for doesn't exist or has been moved. Let's help you find your dream home
          instead!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/properties" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse Properties
            </Link>
          </Button>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Need help finding what you're looking for?</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 hover:underline">
              Contact Us
            </Link>
            <Link href="/about" className="text-blue-600 hover:text-blue-700 hover:underline">
              About Property Pinoy
            </Link>
            <Link href="/properties/new" className="text-blue-600 hover:text-blue-700 hover:underline">
              List Your Property
            </Link>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  )
}
