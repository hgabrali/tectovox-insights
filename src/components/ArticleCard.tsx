import { Link } from "react-router-dom";
import { categoryConfig, contentTypeConfig, type Article } from "@/lib/data";
import { Clock, Play, ExternalLink } from "lucide-react";

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
  const catConfig = categoryConfig[article.category];
  const typeConfig = contentTypeConfig[article.contentType];
  const CatIcon = catConfig.icon;
  const TypeIcon = typeConfig.icon;

  return (
    <ArticleLink
      article={article}
      className={`group block rounded-lg border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Thumbnail area with content-type overlay */}
      <div className={`relative flex items-center justify-center rounded-t-lg ${featured ? "h-48" : "h-32"} bg-muted/50`}>
        <CatIcon className="h-10 w-10 text-muted-foreground/30 transition-colors group-hover:text-primary/50" />

        {/* Video play overlay */}
        {article.contentType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/90 text-destructive-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Podcast waveform overlay */}
        {article.contentType === "podcast" && (
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-center gap-[3px] h-6 opacity-40 group-hover:opacity-60 transition-opacity">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-accent"
                style={{ height: `${Math.max(4, Math.sin(i * 0.7) * 16 + Math.random() * 8 + 6)}px` }}
              />
            ))}
          </div>
        )}

        {/* Book icon overlay */}
        {article.contentType === "book" && (
          <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-md bg-philosophy/20 text-philosophy">
            <TypeIcon className="h-4 w-4" />
          </div>
        )}

        {/* External link indicator */}
        {!article.isBriefing && (
          <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="h-3 w-3" />
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Badge row: category + content type */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${catConfig.color}`}>
            {catConfig.label}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${typeConfig.color}`}>
            <TypeIcon className="h-3 w-3" />
            {typeConfig.label}
          </span>
        </div>

        <h3 className={`mt-3 font-display font-semibold leading-snug transition-colors group-hover:text-primary ${
          featured ? "text-xl" : "text-base"
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
            <span className="flex items-center gap-1 text-primary/60">
              <ExternalLink className="h-3 w-3" />
              Source
            </span>
          )}
        </div>
      </div>
    </ArticleLink>
  );
}
