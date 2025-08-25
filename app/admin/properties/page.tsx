import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Manila, Metro Manila",
    price: 750000,
    type: "Apartment",
    status: "Available",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    listedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Quezon City, Metro Manila",
    price: 1250000,
    type: "House",
    status: "Pending",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    listedDate: "2024-01-10",
  },
  {
    id: 3,
    title: "Luxury Waterfront Condo",
    location: "Cebu City, Cebu",
    price: 2100000,
    type: "Condo",
    status: "Sold",
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 2200,
    listedDate: "2024-01-05",
  },
]

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage all property listings on the platform</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search properties..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="manila">Manila</SelectItem>
                <SelectItem value="cebu">Cebu</SelectItem>
                <SelectItem value="davao">Davao</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Properties ({mockProperties.length})</CardTitle>
          <CardDescription>All property listings in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Property</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Details</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProperties.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{property.title}</p>
                        <p className="text-sm text-gray-600">Listed: {property.listedDate}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{property.location}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">₱{property.price.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600">{property.type}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          property.status === "Available"
                            ? "default"
                            : property.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {property.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {property.bedrooms}BR • {property.bathrooms}BA • {property.sqft} sqft
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
