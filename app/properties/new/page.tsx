"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"
import Link from "next/link"

export default function AddPropertyPage() {
  const [images, setImages] = useState<File[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newImages].slice(0, 10))
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
        <span className="text-gray-900">List Your Property</span>
      </nav>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
        <p className="text-gray-600">Fill out the form below to list your property with us</p>
      </div>

      <form className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Property Details */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Property Details</h2>
            <p className="text-gray-600 text-sm mb-4 sm:mb-6">Basic information about your property</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                <Input placeholder="e.g. Modern Downtown Apartment" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                <Input type="number" placeholder="Enter price" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <Input type="number" placeholder="Number of bedrooms" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <Input type="number" step="0.5" placeholder="Number of bathrooms" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Square Footage</label>
                  <Input type="number" placeholder="Square feet" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                  <Input type="number" placeholder="Year built" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea placeholder="Describe your property..." rows={4} />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Location</h2>
            <p className="text-gray-600 text-sm mb-4 sm:mb-6">Where is your property located?</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <Input placeholder="Enter street address" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <Input placeholder="City" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province/State</label>
                  <Input placeholder="Province or State" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <Input placeholder="ZIP Code" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <Select defaultValue="philippines">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="philippines">Philippines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Information */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 text-sm mb-4 sm:mb-6">How can buyers reach you?</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <Input placeholder="Your full name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input type="email" placeholder="Your email address" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input placeholder="Your phone number" />
              </div>
            </div>
          </div>

          {/* Features & Amenities */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Features & Amenities</h2>
            <p className="text-gray-600 text-sm mb-4 sm:mb-6">Select all that apply to your property</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pool" />
                  <label htmlFor="pool" className="text-sm">
                    Pool
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="garden" />
                  <label htmlFor="garden" className="text-sm">
                    Garden
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="elevator" />
                  <label htmlFor="elevator" className="text-sm">
                    Elevator
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="furnished" />
                  <label htmlFor="furnished" className="text-sm">
                    Furnished
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="garage" />
                  <label htmlFor="garage" className="text-sm">
                    Garage
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="balcony" />
                  <label htmlFor="balcony" className="text-sm">
                    Balcony
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ac" />
                  <label htmlFor="ac" className="text-sm">
                    Air Conditioning
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pet-friendly" />
                  <label htmlFor="pet-friendly" className="text-sm">
                    Pet Friendly
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Images */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Property Images</h2>
          <p className="text-gray-600 text-sm mb-4 sm:mb-6">Upload photos of your property (max 10)</p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
            <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2 text-sm sm:text-base">Click to upload or drag and drop</p>
            <p className="text-xs sm:text-sm text-gray-500">PNG, JPG or WEBP (max. 5MB per image)</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button type="button" variant="outline" className="mt-4 bg-transparent">
                Choose Files
              </Button>
            </label>
          </div>

          {images.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">{images.length} image(s) selected</p>
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
                    {image.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Button type="button" variant="outline" className="w-full sm:w-auto bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="bg-gray-900 hover:bg-gray-800 w-full sm:w-auto">
            Submit Property
          </Button>
        </div>
      </form>
    </div>
  )
}
