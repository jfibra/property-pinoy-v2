"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { createBrowserSupabaseClient } from "@/lib/supabase"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock } from "lucide-react"

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userSession, setUserSession] = useState<any>(null)
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [userInfoError, setUserInfoError] = useState<string | null>(null)
  // Check for existing user session and Supabase connection
  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    // Check Supabase connection
    (async () => {
      try {
        // Try a simple query to check connection
        const { error } = await supabase.from('user_information').select('*').limit(1);
        if (error) {
          setSupabaseStatus('error');
          setSupabaseError(error.message);
        } else {
          setSupabaseStatus('connected');
        }
      } catch (err: any) {
        setSupabaseStatus('error');
        setSupabaseError(err.message);
      }
    })();
    // Check for user session
    supabase.auth.getSession().then(async ({ data }) => {
      setUserSession(data.session?.user || null);
      // Fetch user_information if session exists
      if (data.session?.user?.id) {
        const { data: info, error: infoError } = await supabase
          .from('user_information')
          .select('*, user_types(type_name)')
          .eq('auth_user_id', data.session.user.id)
          .single();
        setUserInfo(info || null);
        setUserInfoError(infoError ? infoError.message : null);
      } else {
        setUserInfo(null);
        setUserInfoError(null);
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const supabase = createBrowserSupabaseClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      const { data: userInfo, error: userInfoError } = await supabase
        .from("user_information")
        .select("user_types(type_name)")
        .eq("auth_user_id", data.user.id)
        .single<{ user_types?: { type_name?: string } }>()

      if (userInfoError || !userInfo?.user_types?.type_name || userInfo.user_types.type_name !== "Admin") {
        await supabase.auth.signOut()
        throw new Error("Access denied. Admin privileges required.")
      }

      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      })

      setTimeout(() => {
        window.location.href = "/admin"
      }, 1000)
    } catch (error: any) {
      const errorMessage = error.message || "Invalid credentials"
      setError(errorMessage)

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image src="/images/logo.png" alt="Property Pinoy" width={120} height={60} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Secure Access
            </CardTitle>
            <CardDescription>Enter your admin credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 font-medium">Login Failed</p>
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input name="email" type="email" placeholder="admin@propertypinoy.com" required className="h-12" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Debug Info: User Session, Supabase Connection, and User Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-md text-xs">
          <div className="mb-2 font-semibold">Debug Info</div>
          <div>
            <span className="font-medium">Supabase connection:</span> {supabaseStatus === 'checking' ? 'Checking...' : supabaseStatus === 'connected' ? 'Connected' : 'Error'}
            {supabaseStatus === 'error' && (
              <span className="text-red-500 ml-2">{supabaseError}</span>
            )}
          </div>
          <div className="mt-2">
            <span className="font-medium">User session:</span>
            {userSession ? (
              <pre className="bg-white border rounded p-2 mt-1 overflow-x-auto">{JSON.stringify(userSession, null, 2)}</pre>
            ) : (
              <span className="ml-2">No user session found.</span>
            )}
          </div>
          <div className="mt-2">
            <span className="font-medium">User information (from DB):</span>
            {userInfoError && <span className="text-red-500 ml-2">{userInfoError}</span>}
            {userInfo ? (
              <pre className="bg-white border rounded p-2 mt-1 overflow-x-auto">{JSON.stringify(userInfo, null, 2)}</pre>
            ) : (
              <span className="ml-2">No user_information found for this user.</span>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">This page is not indexed by search engines</p>
        </div>
      </div>
    </div>
  )
}
