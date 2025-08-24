"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // <CHANGE> Added data formatting functions
  const formatName = (name: string) => {
    return name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const formatEmail = (email: string) => {
    return email.toLowerCase()
  }

  const formatPhone = (phone: string) => {
    return phone.replace(/[^0-9\s\-+$$$$]/g, "")
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    // <CHANGE> Format data before submission
    const firstName = formatName(formData.get("firstName") as string)
    const lastName = formatName(formData.get("lastName") as string)
    const email = formatEmail(formData.get("email") as string)
    const phone = formatPhone((formData.get("phone") as string) || "")
    const company = formatName((formData.get("company") as string) || "")
    const subject = ((formData.get("subject") as string) || "").toLowerCase()
    const message = (formData.get("message") as string).toLowerCase()

    // <CHANGE> Validate email format
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const data = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      subject,
      message,
      company,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        })
        // Reset form
        e.currentTarget.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Contact Us</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about a property or need assistance? We're here to help. Get in touch with our team and we'll
          respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <Input name="firstName" placeholder="Your first name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <Input name="lastName" placeholder="Your last name" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <Input name="email" type="email" placeholder="your.email@example.com" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input name="phone" placeholder="Your phone number" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <Input name="company" placeholder="Your company (optional)" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <Input name="subject" placeholder="What is this regarding?" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <Textarea name="message" placeholder="Tell us how we can help you..." rows={6} required />
            </div>

            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Office Address</h3>
                  <p className="text-gray-600">
                    123 Business District
                    <br />
                    Makati City, Metro Manila
                    <br />
                    Philippines 1200
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">
                    +63 (02) 123-4567
                    <br />
                    +63 917 123 4567
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                  <Mail className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">
                    info@propertypinoy.com
                    <br />
                    support@propertypinoy.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 9:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Find Us Section with Google Maps */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Us</h3>
            {/* <CHANGE> Added Google Maps embed */}
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.100755641572!2d123.90383347828292!3d10.31812108509571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99940ee6ed46b%3A0xbd7dddf03bef15c7!2sAyala%20Center%20Cebu!5e0!3m2!1sen!2sph!4v1756047590218!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Pinoy Office Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 sm:mt-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Quick answers to common questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">How do I list my property?</h3>
            <p className="text-gray-600">
              Simply click on "List Your Property" in the navigation menu and fill out our comprehensive form. Our team
              will review and publish your listing within 24 hours.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">Is there a fee to list my property?</h3>
            <p className="text-gray-600">
              We offer competitive listing packages. Contact us for detailed pricing information and to discuss the best
              option for your property.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">How do I schedule a property viewing?</h3>
            <p className="text-gray-600">
              You can contact the listing agent directly through the property detail page, or call our office to arrange
              a viewing.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">Do you provide property valuation services?</h3>
            <p className="text-gray-600">
              Yes, our experienced team can provide professional property valuations. Contact us to schedule a
              consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
