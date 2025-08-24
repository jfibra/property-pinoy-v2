"use client"

import { useState } from "react"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Grid, List } from "lucide-react"

const properties = [
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
    image: "/modern-apartment-building.png",
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
    image: "/suburban-family-house.png",
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
    image: "/luxury-waterfront-condominium.png",
  },
  {
    id: 4,
    title: "Charming Historic Townhouse",
    location: "101 Brick Lane, Vigan, Ilocos Sur",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    type: "Townhouse",
    status: "Available",
    image: "/historic-townhouse.png",
  },
  {
    id: 5,
    title: "Mountain View Cabin",
    location: "222 Pine Rd, Baguio, Benguet",
    price: 650000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    type: "House",
    status: "Available",
    image: "/secluded-mountain-cabin.png",
  },
  {
    id: 6,
    title: "Beachfront Villa",
    location: "333 Shoreline Dr, Boracay, Aklan",
    price: 3500000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4200,
    type: "House",
    status: "Available",
    image: "/beachfront-villa.png",
  },
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([100000, 5000000])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Properties</h1>
        <p className="text-gray-600">Find your perfect home from our listings</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input placeholder="Search by location, property name, or keyword..." className="pl-10 pr-4 py-3 text-lg" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm">
                Reset
              </Button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-3">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000000}
                  min={100000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₱{priceRange[0].toLocaleString()}</span>
                  <span>₱{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Bedrooms</h4>
              <div className="space-y-2">
                <Slider defaultValue={[1]} max={5} min={1} step={1} />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span>5+</span>
                </div>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Bathrooms</h4>
              <div className="space-y-2">
                <Slider defaultValue={[1]} max={5} min={1} step={1} />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span>5+</span>
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Property Type</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="house" defaultChecked />
                  <label htmlFor="house" className="text-sm">
                    House
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="apartment" />
                  <label htmlFor="apartment" className="text-sm">
                    Apartment
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="condo" />
                  <label htmlFor="condo" className="text-sm">
                    Condo
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="townhouse" />
                  <label htmlFor="townhouse" className="text-sm">
                    Townhouse
                  </label>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Status</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="available" defaultChecked />
                  <label htmlFor="available" className="text-sm">
                    Available
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending" />
                  <label htmlFor="pending" className="text-sm">
                    Pending
                  </label>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gray-900 hover:bg-gray-800">Apply Filters</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Sort: Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="bedrooms">Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
