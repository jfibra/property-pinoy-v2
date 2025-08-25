import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
      user_type_id,
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

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Create user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Skip email confirmation
    })

    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json({ error: "Failed to create user account", details: authError }, { status: 500 })
    }

    let companyId = null

    // Create company if company information is provided
    if (companyName) {
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          company_name: companyName,
          company_type: companyType || null,
          industry: industry || null,
          registration_no: registrationNo || null,
          address: companyAddress || null,
          city: companyCity || null,
          country: companyCountry || null,
          phone: companyPhone || null,
          email: companyEmail || null,
          website: website || null,
        })
        .select()
        .single()

      if (companyError) {
        console.error("Company creation error:", companyError)
        // Continue without company - don't fail the entire operation
      } else {
        companyId = company.id
      }
    }

  // Use user_type_id directly from the request
  let userTypeId = user_type_id || null;

    // Get or create default active status
    let statusId = null
    const { data: activeStatus } = await supabase.from("user_statuses").select("id").eq("status_key", "active").single()

    if (activeStatus) {
      statusId = activeStatus.id
    } else {
      // Create default active status
      const { data: newStatus } = await supabase
        .from("user_statuses")
        .insert({
          status_key: "active",
          status_label: "Active",
          description: "Active user status",
        })
        .select()
        .single()

      if (newStatus) {
        statusId = newStatus.id
      }
    }

    // Create user information record
    const { data: userInfo, error: userInfoError } = await supabase
      .from("user_information")
      .insert({
        auth_user_id: authUser.user.id,
        company_id: companyId,
        user_type_id: userTypeId,
        status_id: statusId,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName || null,
        gender: gender || null,
        birthdate: birthdate || null,
        email,
        phone: phone || null,
        address: address || null,
        city: city || null,
        country: country || null,
      })
      .select()

    if (userInfoError) {
      console.error("User info error:", userInfoError)
      return NextResponse.json({ error: "Failed to create user information" }, { status: 500 })
    }

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
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
