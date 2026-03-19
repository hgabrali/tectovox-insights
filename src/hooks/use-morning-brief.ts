import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Brief {
  date: string;
  content_en: string;
  content_tr: string;
}

export function useMorningBrief() {
  return useQuery({
    queryKey: ["morning-brief"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("briefs")
        .select("*")
        .order("date", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data || data.length === 0) return null;

      const brief = data[0] as Brief;
      const today = new Date().toISOString().split("T")[0];
      if (brief.date !== today) return null;

      return brief;
    },
  });
}
