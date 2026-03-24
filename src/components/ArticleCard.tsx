import { Link } from "react-router-dom";
import { categoryConfig, contentTypeConfig, type Article, type Category } from "@/lib/data";
import { Clock, ExternalLink } from "lucide-react";

const categoryInitials: Record<Category, string> = {
  technology: "T",
  media: "M",
  communication: "C",
  philosophy: "P",
  advertising: "A",
  ai: "AI",
  academia: "Ac",
  "data-science": "DS",
};

const categoryBgClass: Record<Category, string> = {
  technology: "bg-tech",
  media: "bg-media",
  communication: "bg-communication",
  philosophy: "bg-philosophy",
  advertising: "bg-advertising",
  ai: "bg-ai",
  academia: "bg-academia",
  "data-science": "bg-data-science",
};

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

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const category = article.category ?? "technology";
  const contentType = article.contentType ?? "article";
  const catConfig = categoryConfig[category] ?? categoryConfig.technology;
  const typeConfig = contentTypeConfig[contentType] ?? contentTypeConfig.article;
  const TypeIcon = typeConfig.icon;
  const initial = categoryInitials[category] ?? "T";
  const bgClass = categoryBgClass[category] ?? "bg-tech";

  return (
    <ArticleLink
      article={article}
      className={`group block rounded-lg border border-border bg-card transition-colors hover:border-foreground/20 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Thumbnail / colored initial block */}
      <div className={`rounded-t-lg overflow-hidden ${featured ? "h-40" : "h-28"}`}>
        {article.imageUrl ? (
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <div className={`flex items-center justify-center w-full h-full ${bgClass}`}>
            <span className="text-5xl font-display font-black text-primary-foreground select-none">
              {initial}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${catConfig.color}`}>
            {catConfig.label}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${typeConfig.color}`}>
            <TypeIcon className="h-3 w-3" />
            {typeConfig.label}
          </span>
        </div>

        <h3 className={`mt-3 font-display font-bold leading-snug transition-colors group-hover:text-primary ${
          featured ? "text-xl" : "text-lg"
        }`}>
          {article.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
          {!article.isBriefing && (
            <span className="flex items-center gap-1 text-muted-foreground/60">
              <ExternalLink className="h-3 w-3" />
              Source
            </span>
          )}
        </div>
      </div>
    </ArticleLink>
  );
}
