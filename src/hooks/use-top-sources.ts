import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Category } from "@/lib/data";

export interface SourceStat {
  sourceName: string;
  count: number;
  category: Category;
  recentArticles: { title: string; sourceUrl: string }[];
}

function extractDomain(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host;
  } catch {
    return url;
  }
}

export function useTopSources() {
  return useQuery({
    queryKey: ["top-sources-week"],
    queryFn: async () => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from("items")
        .select("title, source_url, category")
        .gte("published_at", weekAgo)
        .order("published_at", { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) return [];

      // Group by domain
      const grouped = new Map<string, { category: string; articles: { title: string; sourceUrl: string }[] }>();

      for (const row of data) {
        const domain = extractDomain(row.source_url);
        if (!grouped.has(domain)) {
          grouped.set(domain, { category: row.category, articles: [] });
        }
        const entry = grouped.get(domain)!;
        if (entry.articles.length < 2) {
          entry.articles.push({ title: row.title, sourceUrl: row.source_url });
        }
      }

      const results: SourceStat[] = [];
      for (const [name, val] of grouped) {
        results.push({
          sourceName: name,
          count: data.filter((r) => extractDomain(r.source_url) === name).length,
          category: val.category as Category,
          recentArticles: val.articles,
        });
      }

      return results
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    },
    staleTime: 5 * 60 * 1000,
  });
}
