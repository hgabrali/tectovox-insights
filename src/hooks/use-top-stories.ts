import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article, Category, ContentType } from "@/lib/data";

interface ItemRow {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content_type: string;
  published_at: string;
  author: string;
  image_url: string | null;
  read_time: string;
  trending: boolean;
  source_url: string;
  is_briefing: boolean;
}

function rowToArticle(row: ItemRow): Article {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category as Category,
    contentType: row.content_type as ContentType,
    date: row.published_at,
    author: row.author,
    imageUrl: row.image_url ?? undefined,
    readTime: row.read_time,
    trending: row.trending,
    sourceUrl: row.source_url,
    isBriefing: row.is_briefing,
  };
}

export function useTopStories() {
  return useQuery({
    queryKey: ["top-stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("relevance_score", { ascending: false })
        .order("published_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      return (data as ItemRow[]).map(rowToArticle);
    },
  });
}
