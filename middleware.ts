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

  // Only check basic authentication for admin routes
  // if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser()
  //
  //   if (!user) {
  //     const url = request.nextUrl.clone()
  //     url.pathname = "/admin/login"
  //     return NextResponse.redirect(url)
  //   }
  // }

  // Redirect authenticated users away from login page
  if (request.nextUrl.pathname === "/admin/login") {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // Add security headers for admin routes
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
