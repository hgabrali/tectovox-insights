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

interface UseItemsOptions {
  category?: Category;
  limit?: number;
  offset?: number;
  search?: string;
  enabled?: boolean;
  sortBy?: "date" | "relevance";
}

export function useItems({ category, limit = 50, offset = 0, search, enabled = true, sortBy = "date" }: UseItemsOptions = {}) {
  return useQuery({
    queryKey: ["items", { category, limit, offset, search, sortBy }],
    enabled,
    queryFn: async () => {
      let query = supabase
        .from("items")
        .select("*");

      if (sortBy === "relevance") {
        query = query
          .order("relevance_score", { ascending: false })
          .order("published_at", { ascending: false });
      } else {
        query = query.order("published_at", { ascending: false });
      }

      if (category) {
        query = query.eq("category", category);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,author.ilike.%${search}%`);
      }

      query = query.range(offset, offset + limit - 1);

      const { data, error } = await query;
      console.log("[useItems] raw Supabase data:", data);
      if (error) throw error;
      return (data as ItemRow[]).map(rowToArticle);
    },
  });
}

export function useItem(id: string | undefined) {
  return useQuery({
    queryKey: ["item", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return rowToArticle(data as ItemRow);
    },
  });
}
