import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import type { Article, Category, ContentType } from "@/lib/data";

export type DateRange = "all" | "today" | "week" | "month";

export interface Filters {
  category: Category | null;
  type: ContentType | null;
  date: DateRange;
  sort: "date" | "relevance";
}

function parseParam<T extends string>(value: string | null, valid: T[]): T | null {
  return value && valid.includes(value as T) ? (value as T) : null;
}

export function useContentFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(() => ({
    category: parseParam(searchParams.get("category"), ["technology", "media", "communication", "philosophy", "advertising"]),
    type: parseParam(searchParams.get("type"), ["article", "video", "podcast", "book"]),
    date: parseParam(searchParams.get("date"), ["all", "today", "week", "month"]) ?? "all",
    sort: parseParam(searchParams.get("sort"), ["date", "relevance"]) ?? "date",
  }), [searchParams]);

  const setFilter = useCallback(
    (key: keyof Filters, value: string | null) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === "all" || value === "date") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      }, { replace: true });
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const applyFilters = useCallback(
    (articles: Article[], overrideCategory?: Category) => {
      const now = new Date();
      return articles
        .filter((a) => {
          const cat = overrideCategory ?? filters.category;
          if (cat && a.category !== cat) return false;
          if (filters.type && a.contentType !== filters.type) return false;
          if (filters.date !== "all") {
            const articleDate = new Date(a.date);
            const diffDays = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24);
            if (filters.date === "today" && diffDays > 1) return false;
            if (filters.date === "week" && diffDays > 7) return false;
            if (filters.date === "month" && diffDays > 30) return false;
          }
          return true;
        })
        .sort((a, b) =>
          filters.sort === "date"
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : 0,
        );
    },
    [filters],
  );

  return { filters, setFilter, clearFilters, applyFilters };
}
