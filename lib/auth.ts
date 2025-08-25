import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function getUser() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserWithRole() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, userInfo: null }
  }

  const { data: userInfo } = await supabase
    .from("user_information")
    .select("*, user_types(type_name)")
    .eq("auth_user_id", user.id)
    .single()

  return { user, userInfo }
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect("/admin/login")
  }
  return user
}

export async function requireAdmin() {
  const { user, userInfo } = await getUserWithRole()

  if (!user) {
    redirect("/admin/login")
  }

  if (!userInfo?.user_types?.type_name || userInfo.user_types.type_name !== "Admin") {
    redirect("/")
  }

  return { user, userInfo }
}
