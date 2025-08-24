import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Received user creation request:", {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    })

    const {
      email,
      password,
      firstName,
      lastName,
      middleName,
      gender,
      birthdate,
      phone,
      address,
      city,
      country,
      userType,
      // Company fields
      companyName,
      companyType,
      industry,
      registrationNo,
      companyAddress,
      companyCity,
      companyCountry,
      companyPhone,
      companyEmail,
      website,
    } = body

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
      // Remove all non-numeric characters
      return phone.replace(/\D/g, "")
    }

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const formattedData = {
      email: formatEmail(email),
      firstName: formatName(firstName),
      lastName: formatName(lastName),
      middleName: middleName ? formatName(middleName) : null,
      phone: formatPhone(phone),
      address: address ? formatName(address) : null,
      city: city ? formatName(city) : null,
      country: country ? formatName(country) : null,
      companyName: companyName ? formatName(companyName) : null,
      companyAddress: companyAddress ? formatName(companyAddress) : null,
      companyCity: companyCity ? formatName(companyCity) : null,
      companyCountry: companyCountry ? formatName(companyCountry) : null,
      companyPhone: formatPhone(companyPhone),
      companyEmail: companyEmail ? formatEmail(companyEmail) : null,
    }

    const supabase = await createAdminClient()
    console.log("[v0] Admin client created successfully")

    // Create user in auth.users
    console.log("[v0] Attempting to create auth user with email:", formattedData.email)
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: formattedData.email,
      password,
      email_confirm: true, // Skip email confirmation
    })

    if (authError) {
      console.error("[v0] Auth error details:", authError)
      return NextResponse.json(
        {
          error: "Failed to create user account",
          details: authError.message,
          code: authError.code,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Auth user created successfully:", authUser.user.id)

    let companyId = null

    // Create company if company information is provided
    if (formattedData.companyName) {
      console.log("[v0] Creating company:", formattedData.companyName)
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          company_name: formattedData.companyName,
          company_type: companyType || null,
          industry: industry || null,
          registration_no: registrationNo || null,
          address: formattedData.companyAddress,
          city: formattedData.companyCity,
          country: formattedData.companyCountry,
          phone: formattedData.companyPhone,
          email: formattedData.companyEmail,
          website: website || null,
        })
        .select()
        .single()

      if (companyError) {
        console.error("[v0] Company creation error:", companyError)
        // Continue without company - don't fail the entire operation
      } else {
        companyId = company.id
        console.log("[v0] Company created successfully:", companyId)
      }
    }

    // Get or create user type
    let userTypeId = null
    if (userType) {
      console.log("[v0] Processing user type:", userType)
      const { data: existingUserType } = await supabase
        .from("user_types")
        .select("id")
        .eq("type_name", userType)
        .single()

      if (existingUserType) {
        userTypeId = existingUserType.id
        console.log("[v0] Found existing user type:", userTypeId)
      } else {
        // Create new user type
        const { data: newUserType, error: userTypeError } = await supabase
          .from("user_types")
          .insert({
            type_name: userType,
            description: `${userType} user type`,
          })
          .select()
          .single()

        if (userTypeError) {
          console.error("[v0] User type creation error:", userTypeError)
        } else if (newUserType) {
          userTypeId = newUserType.id
          console.log("[v0] Created new user type:", userTypeId)
        }
      }
    }

    // Get or create default active status
    let statusId = null
    console.log("[v0] Getting user status")
    const { data: activeStatus, error: statusSelectError } = await supabase
      .from("user_statuses")
      .select("id")
      .eq("status_key", "active")
      .single()

    if (statusSelectError) {
      console.log("[v0] No active status found, creating one:", statusSelectError)
      // Create default active status
      const { data: newStatus, error: statusCreateError } = await supabase
        .from("user_statuses")
        .insert({
          status_key: "active",
          status_label: "Active",
          description: "Active user status",
        })
        .select()
        .single()

      if (statusCreateError) {
        console.error("[v0] Status creation error:", statusCreateError)
      } else if (newStatus) {
        statusId = newStatus.id
        console.log("[v0] Created new status:", statusId)
      }
    } else {
      statusId = activeStatus.id
      console.log("[v0] Found existing status:", statusId)
    }

    // Create user information record
    console.log("[v0] Creating user information record")
    const { data: userInfo, error: userInfoError } = await supabase
      .from("user_information")
      .insert({
        auth_user_id: authUser.user.id,
        company_id: companyId,
        user_type_id: userTypeId,
        status_id: statusId,
        first_name: formattedData.firstName,
        last_name: formattedData.lastName,
        middle_name: formattedData.middleName,
        gender: gender || null,
        birthdate: birthdate || null,
        email: formattedData.email,
        phone: formattedData.phone,
        address: formattedData.address,
        city: formattedData.city,
        country: formattedData.country,
      })
      .select()

    if (userInfoError) {
      console.error("[v0] User info error:", userInfoError)
      return NextResponse.json(
        {
          error: "Failed to create user information",
          details: userInfoError.message,
          code: userInfoError.code,
        },
        { status: 500 },
      )
    }

    console.log("[v0] User created successfully:", userInfo)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: authUser.user,
        userInfo,
        companyId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
