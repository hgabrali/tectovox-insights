import { supabaseAdmin } from "./supabase-admin.js";

export async function checkDuplicate(url: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("items")
    .select("id")
    .eq("url", url)
    .limit(1)
    .single();

  return data !== null;
}
