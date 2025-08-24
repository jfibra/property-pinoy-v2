import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyCard } from "@/components/property-card"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"

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
      {/* Hero Section */}
      <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Find Your Dream Property
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                Browse thousands of listings, connect with agents, and find the perfect home in the Philippines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800">
                  <Link href="/properties">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Properties
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
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
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                    <SelectTrigger>
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
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Location" className="pl-10" />
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800">Search Properties</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 sm:py-16">
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
    </div>
  )
}
