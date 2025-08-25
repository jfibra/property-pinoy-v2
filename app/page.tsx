import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyCard } from "@/components/property-card"
import { Search, MapPin, Home, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Property Pinoy - Find Your Dream Property in the Philippines",
  description:
    "Browse thousands of property listings in the Philippines. Find houses, condos, apartments for sale in Manila, Cebu, and across the Philippines.",
  keywords: [
    "Philippines real estate",
    "property for sale Philippines",
    "houses for sale",
    "condos for sale",
    "Manila properties",
    "Cebu properties",
  ],
  openGraph: {
    title: "Property Pinoy - Find Your Dream Property in the Philippines",
    description: "Browse thousands of property listings in the Philippines. Find houses, condos, apartments for sale.",
    images: ["/images/logo.png"],
  },
}

const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "123 Main St, Manila, Metro Manila",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "Apartment",
    status: "Available",
    image: "/modern-apartment-building-in-manila.png",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "456 Oak Ave, Quezon City, Metro Manila",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    type: "House",
    status: "Available",
    image: "/suburban-family-house-with-garden.png",
  },
  {
    id: 3,
    title: "Luxury Waterfront Condo",
    location: "789 Beach Blvd, Cebu City, Cebu",
    price: 2100000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 2200,
    type: "Condo",
    status: "Pending",
    image: "/luxury-waterfront-condominium-with-ocean-view.png",
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Background */}
      <section
        className="relative py-12 sm:py-16 lg:py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/backgrounds/cebu-city-sky.png')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Find Your Dream Property
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8">
                Browse thousands of listings, connect with agents, and find the perfect home in the Philippines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/properties">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Properties
                  </Link>
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

            {/* Quick Search */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold">Quick Search</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                    <Select>
                      <SelectTrigger className="w-full h-14 text-lg">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="100000">₱100,000</SelectItem>
                        <SelectItem value="500000">₱500,000</SelectItem>
                        <SelectItem value="1000000">₱1,000,000</SelectItem>
                        <SelectItem value="2000000">₱2,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                    <Select>
                      <SelectTrigger className="w-full h-14 text-lg">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1000000">₱1,000,000</SelectItem>
                        <SelectItem value="2000000">₱2,000,000</SelectItem>
                        <SelectItem value="5000000">₱5,000,000</SelectItem>
                        <SelectItem value="10000000">₱10,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <Select>
                      <SelectTrigger className="w-full h-14 text-lg">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <Select>
                      <SelectTrigger className="w-full h-14 text-lg">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <Select>
                    <SelectTrigger className="w-full h-14 text-lg">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-4 h-6 w-6 text-gray-400" />
                  <Input placeholder="Location" className="pl-14 h-14 text-lg w-full" />
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800">Search Properties</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Complete Real Estate Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From property search to financing, we provide everything you need for your real estate journey in the
              Philippines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Loan Calculator Service */}
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Image src="/svg/mortgage-calculator.svg" alt="Loan Calculator" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loan Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">
                Calculate your monthly payments and find the best financing options for your dream property.
              </p>
              <Button variant="outline" size="sm">
                Calculate Now
              </Button>
            </div>

            {/* Property Listing Service */}
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Image src="/svg/house-and-lot.svg" alt="List Property" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">List Your Property</h3>
              <p className="text-gray-600 text-sm mb-4">
                Sell or rent your property with our comprehensive listing service and reach thousands of buyers.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/properties/new">List Now</Link>
              </Button>
            </div>

            {/* Investment Guidance */}
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Image src="/svg/good-investment.svg" alt="Investment" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Advice</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get expert guidance on property investments and market trends in the Philippines.
              </p>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>

            {/* Market Analysis */}
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Image src="/svg/house-price-increase.svg" alt="Market Analysis" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Analysis</h3>
              <p className="text-gray-600 text-sm mb-4">
                Access detailed market reports and property value trends across major Philippine cities.
              </p>
              <Button variant="outline" size="sm">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-12 sm:py-16 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/backgrounds/subdivision-houses.png')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why Choose Property Pinoy?</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              We're the Philippines' trusted real estate platform, connecting buyers, sellers, and investors nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10,000+ Properties</h3>
              <p className="text-gray-200">
                Largest selection of verified properties across Metro Manila, Cebu, Davao, and more.
              </p>
            </div>

            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Agents</h3>
              <p className="text-gray-200">
                Work with licensed and experienced real estate professionals who know the local market.
              </p>
            </div>

            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-600 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Expertise</h3>
              <p className="text-gray-200">
                Get insights on property values, investment opportunities, and market trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Properties</h2>
              <p className="text-gray-600 mt-2">Discover our handpicked selection of premium properties</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-12 sm:py-16 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.9)), url('/backgrounds/home-investment.png')",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of satisfied customers who found their perfect home through Property Pinoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/properties">
                <Search className="mr-2 h-4 w-4" />
                Start Searching
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">Get Expert Help</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
