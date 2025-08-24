import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Property Pinoy - Get in Touch with Our Real Estate Team",
  description:
    "Contact Property Pinoy for all your real estate needs in the Philippines. Get expert advice, schedule property viewings, or list your property with us.",
  keywords: [
    "contact Property Pinoy",
    "real estate contact Philippines",
    "property consultation",
    "real estate advice",
  ],
}

export default function ContactPage() {
  return <ContactPageClient />
}
