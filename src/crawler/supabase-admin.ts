/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";

// This file is used by the Node.js crawler scripts only (run via tsx).
const g = globalThis as any;
const supabaseUrl: string | undefined = g.process?.env?.SUPABASE_URL;
const supabaseServiceRoleKey: string | undefined = g.process?.env?.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
