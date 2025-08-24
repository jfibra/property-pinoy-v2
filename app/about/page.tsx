import { Button } from "@/components/ui/button"
import { Users, Award, Home, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Property Pinoy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in finding the perfect property in the Philippines. We connect buyers with their dream
          homes and help property owners reach the right audience.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At Property Pinoy, we believe that finding the right property should be simple, transparent, and
            stress-free. Our mission is to revolutionize the Philippine real estate market by providing a comprehensive
            platform that serves both property seekers and property owners.
          </p>
          <p className="text-gray-600 mb-6">
            We focus exclusively on property sales, ensuring that every listing on our platform represents a genuine
            opportunity for homeownership. Whether you're a first-time buyer or an experienced investor, we're here to
            guide you through your property journey.
          </p>
          <Button asChild className="bg-gray-900 hover:bg-gray-800">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
        <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Mission Image Placeholder</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">1,000+</h3>
          <p className="text-gray-600">Properties Listed</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
          <p className="text-gray-600">Happy Clients</p>
        </div>
        <div className="text-center">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">5+</h3>
          <p className="text-gray-600">Years Experience</p>
        </div>
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
          <p className="text-gray-600">Satisfaction Rate</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive real estate services focused on property sales in the Philippines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Listings</h3>
            <p className="text-gray-600">
              Browse through thousands of verified property listings across the Philippines. From condos in Manila to
              beachfront properties in Cebu.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Marketing</h3>
            <p className="text-gray-600">
              List your property with us and reach thousands of potential buyers. We handle the marketing so you can
              focus on what matters most.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Consultation</h3>
            <p className="text-gray-600">
              Get professional advice on property values, market trends, and investment opportunities from our
              experienced team.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied clients who have found their perfect home through Property Pinoy. Start your
          property journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
          >
            <Link href="/properties/new">List Your Property</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
