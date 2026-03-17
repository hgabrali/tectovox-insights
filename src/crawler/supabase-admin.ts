import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (globalThis as Record<string, unknown>).process
  ? (globalThis as Record<string, unknown> & { process: { env: Record<string, string> } }).process.env.SUPABASE_URL
  : undefined;
const supabaseServiceRoleKey = (globalThis as Record<string, unknown>).process
  ? (globalThis as Record<string, unknown> & { process: { env: Record<string, string> } }).process.env.SUPABASE_SERVICE_ROLE_KEY
  : undefined;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
