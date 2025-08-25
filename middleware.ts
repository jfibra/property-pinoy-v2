import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error && request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }

    try {
      const { data: userInfo, error: userInfoError } = await supabase
        .from("user_information")
        .select("user_types(type_name)")
        .eq("auth_user_id", user.id)
        .single()

      if (userInfoError || !userInfo?.user_types?.type_name || userInfo.user_types.type_name !== "Admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      console.error("Error checking user role:", error)
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Redirect authenticated users away from login page
  if (request.nextUrl.pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    supabaseResponse.headers.set("X-Frame-Options", "DENY")
    supabaseResponse.headers.set("X-Content-Type-Options", "nosniff")
    supabaseResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
