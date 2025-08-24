import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Bath, Square, Calendar, MapPin, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, this would fetch property data from database
  const property = {
    title: "Luxury Waterfront Condo",
    location: "789 Beach Blvd, Cebu City, Cebu",
    price: 2100000,
    bedrooms: 3,
    bathrooms: 3.5,
    type: "Condo",
    description: "This stunning waterfront condo offers breathtaking views of the ocean and city skyline.",
  }

  return {
    title: `${property.title} - ${property.location} | Property Pinoy`,
    description: `${property.description} ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms. Price: ₱${property.price.toLocaleString()}`,
    keywords: [
      `${property.type} for sale`,
      `${property.location}`,
      "waterfront property",
      "Cebu real estate",
      "luxury condo",
    ],
    openGraph: {
      title: `${property.title} - Property Pinoy`,
      description: property.description,
      images: ["/images/logo.png"],
      type: "article",
    },
  }
}

// Mock data - in a real app, this would come from a database
const property = {
  id: 3,
  title: "Luxury Waterfront Condo",
  location: "789 Beach Blvd, Cebu City, Cebu",
  price: 2100000,
  bedrooms: 3,
  bathrooms: 3.5,
  sqft: 2200,
  yearBuilt: 2018,
  type: "Condo",
  status: "Available",
  description:
    "This stunning waterfront condo offers breathtaking views of the ocean and city skyline. Featuring floor-to-ceiling windows, a gourmet kitchen with top-of-the-line appliances, and a spacious open floor plan perfect for entertaining. The master suite includes a luxurious bathroom with a soaking tub and walk-in shower. Additional amenities include a private balcony, two assigned parking spaces, and access to the building's pool, fitness center, and 24-hour concierge service.",
  images: [
    "/luxury-waterfront-condominium-living-room-with-oce.png",
    "/modern-kitchen-with-ocean-view-and-granite-counter.png",
    "/luxury-bathroom-with-soaking-tub-and-marble-finish.png",
    "/ocean-view-bedroom-with-floor-to-ceiling-windows.png",
    "/balcony-with-ocean-view-and-outdoor-furniture.png",
  ],
  agent: {
    name: "Jane Smith",
    title: "Listing Agent",
    phone: "(02) 555-1234",
    email: "jane.smith@propertypinoy.com",
  },
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4 sm:mb-6">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-gray-900">
          Properties
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{property.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{property.location}</span>
                </div>
                <Badge
                  className={
                    property.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {property.status}
                </Badge>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{formatPrice(property.price)}</div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Property Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 text-sm sm:text-base">
              <div className="flex items-center">
                <Bed className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span>{property.sqft} sq ft</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span>Built in {property.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-64 sm:h-96">
              <div className="col-span-2 row-span-2">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Image ${index + 2}`}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Property Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Interior Features</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Floor-to-ceiling windows</li>
                      <li>• Gourmet kitchen</li>
                      <li>• Open floor plan</li>
                      <li>• Master suite</li>
                      <li>• Walk-in closets</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Building Amenities</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Swimming pool</li>
                      <li>• Fitness center</li>
                      <li>• 24-hour concierge</li>
                      <li>• Assigned parking</li>
                      <li>• Private balcony</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="text-gray-600 mb-4">
                  Located in the heart of Cebu City with easy access to shopping, dining, and entertainment.
                </p>
                <div className="bg-gray-200 h-48 sm:h-64 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Map would be displayed here</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg sticky top-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
              <h3 className="font-semibold text-lg">{property.agent.name}</h3>
              <p className="text-gray-600 text-sm">{property.agent.title}</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">{property.agent.phone}</p>
                <p className="text-sm text-gray-600 break-all">{property.agent.email}</p>
              </div>
            </div>

            <Button className="w-full mb-3 bg-gray-900 hover:bg-gray-800">Contact Agent</Button>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <Input placeholder="Enter your name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <Input type="email" placeholder="Enter your email" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                <Input placeholder="Enter your phone number" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  placeholder={`I'm interested in ${property.title} at ${property.location}. Please contact me with more information.`}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
