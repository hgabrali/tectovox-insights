import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { categoryConfig, contentTypeConfig } from "@/lib/data";
import { useItems } from "@/hooks/use-items";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { ArchiveListSkeleton, EmptyState, ErrorState } from "@/components/ContentStates";
import { Search, Clock, Calendar } from "lucide-react";

const ITEMS_PER_PAGE = 50;

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebouncedValue(searchInput, 300);
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const { data: allItems = [], isLoading, isError, refetch } = useItems({
    search: debouncedSearch || undefined,
    limit: 500,
  });

  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  const paginated = allItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const setPage = (p: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    }, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
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
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.set("page", "1");
                  return next;
                }, { replace: true });
              }}
              placeholder="Search articles, authors, topics..."
              className="w-full rounded-lg border bg-card pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            {allItems.length} result{allItems.length !== 1 ? "s" : ""}
          </div>

          {isLoading ? (
            <ArchiveListSkeleton />
          ) : isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : paginated.length === 0 ? (
            <EmptyState message="No results found." />
          ) : (
            <div className="flex flex-col divide-y">
              {paginated.map((article) => {
                const category = article.category ?? "technology";
                const contentType = article.contentType ?? "article";
                const catConfig = categoryConfig[category] ?? categoryConfig.technology;
                const typeConfig = contentTypeConfig[contentType] ?? contentTypeConfig.article;
                const TypeIcon = typeConfig.icon;
                const Wrapper = article.isBriefing
                  ? ({ children, className: cn }: { children: React.ReactNode; className?: string }) => (
                      <Link to={`/article/${article.id}`} className={cn}>{children}</Link>
                    )
                  : ({ children, className: cn }: { children: React.ReactNode; className?: string }) => (
                      <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className={cn}>{children}</a>
                    );
                return (
                  <Wrapper
                    key={article.id}
                    className="group flex items-start gap-4 py-4 transition-colors hover:bg-muted/30 -mx-3 px-3 rounded-md"
                  >
                    <div className="hidden shrink-0 w-16 pt-0.5 text-xs text-muted-foreground sm:block">
                      {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
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
                    <div className="hidden shrink-0 items-center gap-3 text-xs text-muted-foreground md:flex">
                      <span>{article.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
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
      </main>
      <SiteFooter />
    </div>
  );
};

export default ArchivePage;
