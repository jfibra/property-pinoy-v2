import { createAdminClient } from "@/lib/supabase";

export async function getUserTypes() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("user_types").select("id, type_name").order("type_name");
  if (error) throw error;
  return data;
}
