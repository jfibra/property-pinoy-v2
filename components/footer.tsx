import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Property Pinoy"
              width={200}
              height={60}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-4">
              Your trusted partner in finding the perfect property in the Philippines. We help you discover your dream
              home and assist property owners in listing their properties.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white">
                  Find A Property
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties/new" className="text-gray-300 hover:text-white">
                  List Your Property
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Property Consultation</span>
              </li>
              <li>
                <span className="text-gray-300">Market Analysis</span>
              </li>
              <li>
                <span className="text-gray-300">Property Management</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© 2024 Property Pinoy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-300 hover:text-white text-sm">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white text-sm">
              Privacy
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
