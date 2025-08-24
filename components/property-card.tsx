import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square } from "lucide-react"

interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  type: string
  status: string
  image: string
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Link href={`/properties/${property.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className={`absolute top-3 right-3 ${getStatusColor(property.status)}`}>{property.status}</Badge>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-600 mb-3 flex items-center">
            <span className="text-sm">{property.location}</span>
          </p>

          <div className="text-2xl font-bold text-gray-900 mb-4">{formatPrice(property.price)}</div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.sqft} sq ft</span>
              </div>
            </div>
            <Badge variant="secondary">{property.type}</Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
