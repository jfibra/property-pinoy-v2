import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message, company } = body

    const formatName = (name: string) => {
      if (!name) return name
      return name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    }

    const formatEmail = (email: string) => {
      return email.toLowerCase()
    }

    const formatPhone = (phone: string) => {
      if (!phone) return phone
      // Remove all non-numeric characters and keep only numbers
      return phone.replace(/\D/g, "")
    }

    const formatText = (text: string) => {
      if (!text) return text
      return text.toLowerCase()
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const formattedData = {
      firstName: formatName(firstName),
      lastName: formatName(lastName),
      email: formatEmail(email),
      phone: formatPhone(phone),
      subject: formatText(subject),
      message: formatText(message),
      company: company ? formatName(company) : null,
    }

    const supabase = await createAdminClient()

    // Insert contact form submission
    const { data, error } = await supabase
      .from("contact")
      .insert({
        first_name: formattedData.firstName,
        last_name: formattedData.lastName,
        name: `${formattedData.firstName} ${formattedData.lastName}`,
        email: formattedData.email,
        phone: formattedData.phone || null,
        subject: formattedData.subject || null,
        message: formattedData.message,
        company: formattedData.company || null,
      })
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
    }

    return NextResponse.json({ message: "Contact form submitted successfully", data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
