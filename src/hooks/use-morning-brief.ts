import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Session = "morning" | "afternoon" | "evening";

export interface Brief {
  date: string;
  session: Session;
  content_en: string;
  content_tr: string;
}

export function useDailyBriefs() {
  return useQuery({
    queryKey: ["daily-briefs"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await (supabase as any)
        .from("briefs")
        .select("*")
        .eq("date", today)
        .order("session", { ascending: true });

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return data as Brief[];
    },
  });
}
