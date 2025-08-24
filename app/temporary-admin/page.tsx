"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Building2 } from "lucide-react"

export default function TemporaryAdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      middleName: formData.get("middleName") as string,
      gender: formData.get("gender") as string,
      birthdate: formData.get("birthdate") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      userType: formData.get("userType") as string,
      // Company fields (optional)
      companyName: formData.get("companyName") as string,
      companyType: formData.get("companyType") as string,
      industry: formData.get("industry") as string,
      registrationNo: formData.get("registrationNo") as string,
      companyAddress: formData.get("companyAddress") as string,
      companyCity: formData.get("companyCity") as string,
      companyCountry: formData.get("companyCountry") as string,
      companyPhone: formData.get("companyPhone") as string,
      companyEmail: formData.get("companyEmail") as string,
      website: formData.get("website") as string,
    }

    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        toast({
          title: "User created successfully!",
          description: "The user has been added to the system.",
        })
        e.currentTarget.reset()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create user")
      }
    } catch (error) {
      toast({
        title: "Error creating user",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Temporary Admin Panel</h1>
        <p className="text-gray-600">Create users and manage system data</p>
      </div>

      <Tabs defaultValue="create-user" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="create-user">Create User</TabsTrigger>
        </TabsList>

        <TabsContent value="create-user">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create New User
              </CardTitle>
              <CardDescription>Add a new user to the system with optional company information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserSubmit} className="space-y-6">
                {/* User Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <Input name="email" type="email" placeholder="user@example.com" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                      <Input name="password" type="password" placeholder="Password" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <Input name="firstName" placeholder="First name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <Input name="middleName" placeholder="Middle name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <Input name="lastName" placeholder="Last name" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <Select name="gender">
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                      <Input name="birthdate" type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input name="phone" placeholder="Phone number" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <Input name="address" placeholder="Street address" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <Input name="city" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <Input name="country" placeholder="Country" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                    <Select name="userType">
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="owner">Property Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Company Information (Optional) */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information (Optional)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <Input name="companyName" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Type</label>
                      <Input name="companyType" placeholder="Corporation, LLC, etc." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <Input name="industry" placeholder="Real Estate, Construction, etc." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration No.</label>
                      <Input name="registrationNo" placeholder="Business registration number" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                      <Input name="companyAddress" placeholder="Company address" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company City</label>
                      <Input name="companyCity" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Country</label>
                      <Input name="companyCountry" placeholder="Country" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
                      <Input name="companyPhone" placeholder="Company phone" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                      <Input name="companyEmail" type="email" placeholder="company@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <Input name="website" placeholder="https://company.com" />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800" disabled={isSubmitting}>
                  {isSubmitting ? "Creating User..." : "Create User"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
