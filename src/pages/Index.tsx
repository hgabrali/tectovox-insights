import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import { categoryConfig } from "@/lib/data";
import { useItems } from "@/hooks/use-items";
import { useContentFilters } from "@/hooks/use-content-filters";
import { ArticleGridSkeleton, EmptyState, ErrorState } from "@/components/ContentStates";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { filters, setFilter, clearFilters, applyFilters } = useContentFilters();
  const { data: allItems = [], isLoading, isError, refetch } = useItems({ limit: 20 });

  const recentThree = allItems.slice(0, 3);
  const filtered = applyFilters(allItems);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-hero overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--hero-foreground) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--hero-foreground) / 0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="container relative py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-5 items-center">
              {/* Left — 60% */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary mb-6">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Daily Briefing — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </div>

                <h1 className="font-display text-3xl font-bold leading-tight text-hero-foreground md:text-[48px] md:leading-[1.15]">
                  The intersection of technology, media &amp; society
                </h1>

                <p className="mt-5 text-lg leading-relaxed text-hero-muted max-w-xl">
                  Curated intelligence across tech, media, communication, philosophy and advertising — updated daily.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/technology">
                      Explore Today's Briefing <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-hero-card-border text-hero-foreground hover:bg-hero-card hover:text-hero-foreground">
                    <Link to="/archive">Browse Archive</Link>
                  </Button>
                </div>
              </div>

              {/* Right — 40% mini cards */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                {recentThree.length > 0 ? (
                  recentThree.map((item) => {
                    const catConfig = categoryConfig[item.category] ?? categoryConfig.technology;
                    return (
                      <a
                        key={item.id}
                        href={item.isBriefing ? `/article/${item.id}` : item.sourceUrl}
                        target={item.isBriefing ? undefined : "_blank"}
                        rel={item.isBriefing ? undefined : "noopener noreferrer"}
                        className="group rounded-lg border border-hero-card-border bg-hero-card p-4 transition-all hover:border-primary/40 hover:-translate-y-0.5"
                      >
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${catConfig.color}`}>
                          {catConfig.label}
                        </span>
                        <h4 className="mt-2 text-sm font-medium leading-snug text-hero-foreground line-clamp-2 transition-colors group-hover:text-primary">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-hero-muted">{item.author}</p>
                      </a>
                    );
                  })
                ) : (
                  /* Placeholder cards when DB is empty */
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-hero-card-border bg-hero-card p-4">
                      <div className="h-4 w-16 rounded-full bg-hero-card-border animate-pulse" />
                      <div className="mt-3 h-4 w-full rounded bg-hero-card-border/60 animate-pulse" />
                      <div className="mt-2 h-4 w-2/3 rounded bg-hero-card-border/40 animate-pulse" />
                      <div className="mt-2 h-3 w-20 rounded bg-hero-card-border/30 animate-pulse" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="border-b">
          <div className="container py-6">
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryConfig).map(([key, val]) => {
                const Icon = val.icon;
                return (
                  <Link
                    key={key}
                    to={`/${key}`}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-card ${val.color}`}
                  >
                    <Icon className="h-4 w-4" />
                    {val.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filters + Content Grid */}
        <section className="container py-12">
          <h2 className="font-display text-2xl font-bold mb-6">Latest Updates</h2>
          <FilterBar filters={filters} setFilter={setFilter} clearFilters={clearFilters} showCategoryFilter />
          <div className="mt-8">
            {isLoading ? (
              <ArticleGridSkeleton />
            ) : isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : filtered.length === 0 ? (
              <EmptyState message="No articles match your filters." />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((article, i) => (
                  <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* LinkedIn CTA */}
        <section className="border-t bg-card">
          <div className="container py-16 text-center">
            <Linkedin className="mx-auto h-8 w-8 text-primary mb-4" />
            <h2 className="font-display text-2xl font-bold">Stay Informed</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Follow tectovox on LinkedIn for daily briefings at the intersection of tech and society.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <a href="https://linkedin.com/company/tectovox" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> Follow on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
