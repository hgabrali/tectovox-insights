import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { mockArticles } from "@/lib/mock-data";
import { categoryConfig, contentTypeConfig } from "@/lib/data";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { Search, ChevronDown, ChevronRight, Clock, Calendar } from "lucide-react";

const ITEMS_PER_PAGE = 50;

function getMonthGroups(articles: typeof mockArticles) {
  const groups: Record<string, typeof mockArticles> = {};
  for (const a of articles) {
    const d = new Date(a.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    (groups[key] ??= []).push(a);
  }
  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, items]) => {
      const [y, m] = key.split("-");
      const label = new Date(+y, +m - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
      return { key, label, count: items.length };
    });
}

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const selectedMonth = searchParams.get("month");
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (selectedMonth) initial.add(selectedMonth);
    // expand current month by default
    const now = new Date();
    initial.add(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
    return initial;
  });

  // Update URL when search changes
  useMemo(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (debouncedSearch) next.set("q", debouncedSearch);
      else next.delete("q");
      next.set("page", "1");
      return next;
    }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const monthGroups = useMemo(() => getMonthGroups(mockArticles), []);

  const filtered = useMemo(() => {
    let results = [...mockArticles];
    if (selectedMonth) {
      results = results.filter((a) => {
        const d = new Date(a.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        return key === selectedMonth;
      });
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      results = results.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.author.toLowerCase().includes(q),
      );
    }
    return results;
  }, [selectedMonth, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const setPage = (p: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    }, { replace: true });
  };

  const toggleMonth = (key: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectMonth = (key: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (key) next.set("month", key);
      else next.delete("month");
      next.set("page", "1");
      return next;
    }, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-card">
          <div className="container py-10">
            <h1 className="font-display text-3xl font-bold">Archive</h1>
            <p className="mt-2 text-muted-foreground">Browse the complete tectovox collection by date.</p>
          </div>
        </section>

        <div className="container py-8">
          {/* Search bar */}
          <div className="relative mb-8 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles, authors, topics..."
              className="w-full rounded-lg border bg-card pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar: Month/year accordion */}
            <aside className="w-full shrink-0 lg:w-56">
              <h3 className="font-display text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Browse by Month
              </h3>

              <button
                onClick={() => selectMonth(null)}
                className={`mb-2 w-full rounded-md px-3 py-1.5 text-left text-sm font-medium transition-colors ${
                  !selectedMonth ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                All months ({mockArticles.length})
              </button>

              <div className="flex flex-col gap-0.5">
                {monthGroups.map((group) => {
                  const isExpanded = expandedMonths.has(group.key);
                  const isSelected = selectedMonth === group.key;
                  return (
                    <div key={group.key}>
                      <button
                        onClick={() => {
                          toggleMonth(group.key);
                          selectMonth(isSelected ? null : group.key);
                        }}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                          isSelected ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                          {group.label}
                        </span>
                        <span className={`text-xs ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {group.count}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Main: compact list */}
            <div className="flex-1 min-w-0">
              <div className="mb-4 text-sm text-muted-foreground">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                {selectedMonth && (
                  <button onClick={() => selectMonth(null)} className="ml-2 text-primary hover:underline">
                    Clear month filter
                  </button>
                )}
              </div>

              <div className="flex flex-col divide-y">
                {paginated.map((article) => {
                  const catConfig = categoryConfig[article.category];
                  const typeConfig = contentTypeConfig[article.contentType];
                  const TypeIcon = typeConfig.icon;
                  return (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="group flex items-start gap-4 py-4 transition-colors hover:bg-muted/30 -mx-3 px-3 rounded-md"
                    >
                      {/* Date column */}
                      <div className="hidden shrink-0 w-16 pt-0.5 text-xs text-muted-foreground sm:block">
                        {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${catConfig.color}`}>
                            {catConfig.label}
                          </span>
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${typeConfig.color}`}>
                            <TypeIcon className="h-2.5 w-2.5" />
                            {typeConfig.label}
                          </span>
                        </div>
                        <h4 className="font-display text-sm font-semibold leading-snug transition-colors group-hover:text-primary truncate">
                          {article.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-muted-foreground truncate">{article.excerpt}</p>
                      </div>

                      {/* Meta */}
                      <div className="hidden shrink-0 items-center gap-3 text-xs text-muted-foreground md:flex">
                        <span>{article.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {paginated.length === 0 && (
                <p className="py-12 text-center text-muted-foreground">No results found.</p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                    className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-30 hover:bg-muted"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        p === currentPage ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-30 hover:bg-muted"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ArchivePage;
