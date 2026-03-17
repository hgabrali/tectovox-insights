import { Article, categoryConfig, type Category } from "@/lib/data";
import { TrendingUp, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

function ArticleLink({ article, children, className }: { article: Article; children: React.ReactNode; className?: string }) {
  if (article.isBriefing) {
    return <Link to={`/article/${article.id}`} className={className}>{children}</Link>;
  }
  return (
    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

const categoryBorder: Record<Category, string> = {
  technology: "border-l-tech",
  media: "border-l-media",
  communication: "border-l-communication",
  philosophy: "border-l-philosophy",
  advertising: "border-l-advertising",
};

export function TopTenNews({ items, isLoading = false }: { items: Article[]; isLoading?: boolean }) {
  const top10 = items.slice(0, 10);

  return (
    <section className="container py-12 border-b border-border">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="font-display text-3xl font-bold">Top 10 News</h2>
      </div>

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4 border-l-4 border-l-muted">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : top10.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No trending news yet.</p>
      ) : (
      <div className="grid gap-0 md:grid-cols-2">
        {top10.map((article, i) => {
          const category = article.category ?? "technology";
          const catConfig = categoryConfig[category] ?? categoryConfig.technology;
          const borderClass = categoryBorder[category] ?? "border-l-tech";

          return (
            <ArticleLink
              key={article.id}
              article={article}
              className={`group flex items-start gap-4 border-l-4 ${borderClass} px-5 py-4 transition-colors hover:bg-accent/50 ${
                i < top10.length - (top10.length % 2 === 0 ? 2 : 1)
                  ? "border-b border-b-border"
                  : ""
              }`}
            >
              {/* Rank number */}
              <span className="font-display text-3xl font-black text-muted-foreground/30 leading-none mt-0.5 min-w-[2ch] text-right select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${catConfig.color}`}>
                    {catConfig.label}
                  </span>
                  {!article.isBriefing && (
                    <ExternalLink className="h-3 w-3 text-muted-foreground/40" />
                  )}
                </div>
                <h3 className="font-display font-bold text-sm leading-snug line-clamp-2 transition-colors group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {article.author} · {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </ArticleLink>
          );
        })}
      </div>
    </section>
  );
}
