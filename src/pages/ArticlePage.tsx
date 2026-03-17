import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { categoryConfig, contentTypeConfig } from "@/lib/data";
import { useItem, useItems } from "@/hooks/use-items";
import { ArticleGridSkeleton, EmptyState, ErrorState } from "@/components/ContentStates";
import { ArrowLeft, Linkedin, Twitter, Link2, ExternalLink, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function getSourceName(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Source";
  }
}

function generateSummary(_title: string, excerpt: string): string {
  return `${excerpt} This piece examines the broader implications for professionals working at the intersection of technology and society, offering key takeaways for strategic decision-making.`;
}

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, isError, refetch } = useItem(id);
  const { data: relatedItems = [] } = useItems({
    category: article?.category,
    limit: 5,
    enabled: !!article,
  });
  const related = relatedItems.filter((a) => a.id !== article?.id).slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container max-w-3xl py-14 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-20">
          <ErrorState message="Could not load article" onRetry={() => refetch()} />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Article not found</h1>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-primary text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const catConfig = categoryConfig[article.category];
  const typeConfig = contentTypeConfig[article.contentType];
  const CatIcon = catConfig.icon;
  const TypeIcon = typeConfig.icon;
  const sourceName = getSourceName(article.sourceUrl);
  const aiSummary = generateSummary(article.title, article.excerpt);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container pt-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>

        <article className="container max-w-3xl py-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${catConfig.color}`}>
              <CatIcon className="h-3.5 w-3.5" />
              {catConfig.label}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${typeConfig.color}`}>
              <TypeIcon className="h-3.5 w-3.5" />
              {typeConfig.label}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
              <ExternalLink className="h-3.5 w-3.5" />
              {sourceName}
            </a>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="text-muted-foreground/60">by {article.author}</span>
          </div>

          <div className="mt-8 rounded-lg border bg-muted/40 p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Generated Summary
            </div>
            <p className="text-sm leading-relaxed text-foreground/85">{aiSummary}</p>
          </div>

          <div className="mt-8">
            <Button asChild size="lg">
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Read full {typeConfig.label.toLowerCase()} at {sourceName}
              </a>
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Share:</span>
            <Button variant="outline" size="icon" className="h-9 w-9"><Linkedin className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9"><Twitter className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9"><Link2 className="h-4 w-4" /></Button>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t">
            <div className="container py-12">
              <h2 className="font-display text-xl font-bold mb-6">Related</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ArticlePage;
