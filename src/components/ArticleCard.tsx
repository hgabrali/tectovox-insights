import { Link } from "react-router-dom";
import { categoryConfig, type Article } from "@/lib/data";
import { Clock } from "lucide-react";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const config = categoryConfig[article.category];
  const Icon = config.icon;

  return (
    <Link
      to={`/article/${article.id}`}
      className={`group block rounded-lg border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Category icon area */}
      <div className={`flex h-32 items-center justify-center rounded-t-lg ${featured ? "h-48" : ""} bg-muted/50`}>
        <Icon className="h-10 w-10 text-muted-foreground/40 transition-colors group-hover:text-primary/60" />
      </div>

      <div className="p-5">
        {/* Category tag */}
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
          {config.label}
        </span>

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
        </div>
      </div>
    </Link>
  );
}
