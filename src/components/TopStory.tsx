import { categoryConfig, contentTypeConfig, type Article, type Category } from "@/lib/data";
import { ArticleCard } from "@/components/ArticleCard";
import { Clock, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

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

function TopStoryLink({ article, children }: { article: Article; children: React.ReactNode }) {
  if (article.isBriefing) {
    return <Link to={`/article/${article.id}`} className="block">{children}</Link>;
  }
  return (
    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="block">
      {children}
    </a>
  );
}

function TopStorySkeleton() {
  return (
    <section className="container py-10">
      <Skeleton className="h-8 w-40 mb-6" />
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid md:grid-cols-5">
          <Skeleton className="w-full aspect-video md:col-span-3" />
          <div className="p-6 md:p-8 md:col-span-2 space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TopStorySection({
  topStory,
  alsoWorthReading,
  isLoading,
}: {
  topStory: Article | null;
  alsoWorthReading: Article[];
  isLoading: boolean;
}) {
  if (isLoading) return <TopStorySkeleton />;
  if (!topStory) return null;

  const category = topStory.category ?? "technology";
  const contentType = topStory.contentType ?? "article";
  const catConfig = categoryConfig[category] ?? categoryConfig.technology;
  const typeConfig = contentTypeConfig[contentType] ?? contentTypeConfig.article;
  const TypeIcon = typeConfig.icon;
  const bgClass = categoryBgClass[category] ?? "bg-tech";
  const initial = categoryInitials[category] ?? "T";

  return (
    <section className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          <Zap className="h-3.5 w-3.5" />
          Top Story
        </span>
      </div>

      {/* Split layout card */}
      <TopStoryLink article={topStory}>
        <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:border-foreground/20">
          <div className="grid md:grid-cols-5">
            {/* Image - 60% */}
            <div className="md:col-span-3 overflow-hidden">
              {topStory.imageUrl ? (
                <img
                  src={topStory.imageUrl}
                  alt={topStory.title}
                  className="w-full h-full min-h-[220px] md:min-h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className={`flex items-center justify-center w-full h-full min-h-[220px] md:min-h-[320px] ${bgClass}`}>
                  <span className="text-7xl font-display font-black text-primary-foreground select-none">
                    {initial}
                  </span>
                </div>
              )}
            </div>

            {/* Content - 40% */}
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${catConfig.color}`}>
                  {catConfig.label}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${typeConfig.color}`}>
                  <TypeIcon className="h-3 w-3" />
                  {typeConfig.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-bold leading-snug transition-colors group-hover:text-primary">
                {topStory.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {topStory.excerpt}
              </p>

              {/* Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/70">{topStory.author}</span>
                <span>
                  {new Date(topStory.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {topStory.readTime}
                </span>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg group-hover:shadow-primary/25">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </TopStoryLink>

      {/* Also worth reading */}
      {alsoWorthReading.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display text-xl font-bold mb-6 tracking-tight">Also worth reading</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alsoWorthReading.map((article, i) => (
              <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
