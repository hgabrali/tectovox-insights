import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import { TopTenNews } from "@/components/TopTenNews";
import { categoryConfig } from "@/lib/data";
import { useItems } from "@/hooks/use-items";
import { useContentFilters } from "@/hooks/use-content-filters";
import { ArticleGridSkeleton, EmptyState, ErrorState } from "@/components/ContentStates";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import mascotImg from "@/assets/mascot.png";

const Index = () => {
  const { filters, setFilter, clearFilters, applyFilters } = useContentFilters();
  const { data: allItems = [], isLoading, isError, refetch } = useItems({ limit: 20 });

  const filtered = applyFilters(allItems);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Editorial Hero */}
        <section className="container pt-12 pb-10 md:pt-20 md:pb-14">
          <h1 className="font-display text-5xl font-black leading-[1.08] md:text-7xl lg:text-[80px]">
            <span className="relative inline-block">T<img
                src={mascotImg}
                alt="tectovox mascot"
                className="absolute bottom-[65%] left-1/2 -translate-x-1/2 h-[44px] w-[44px] md:h-[64px] md:w-[64px] lg:h-[80px] lg:w-[80px] object-contain pointer-events-auto cursor-pointer z-10"
              /></span>ech. Media. <em className="not-italic font-display italic text-primary">Ideas.</em>
          </h1>
          <p className="mt-4 text-sm font-medium text-muted-foreground tracking-wide uppercase">
            {dateStr}
          </p>
          <div className="mt-8 h-px bg-border" />
        </section>

        {/* Category Quick Links */}
        <section className="border-b border-border">
          <div className="container py-5">
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryConfig).map(([key, val]) => {
                const Icon = val.icon;
                return (
                  <Link
                    key={key}
                    to={`/${key}`}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:opacity-80 ${val.color}`}
                  >
                    <Icon className="h-4 w-4" />
                    {val.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top 10 News */}
        <TopTenNews items={allItems} isLoading={isLoading} />

        {/* Filters + Content Grid */}
        <section className="container py-12">
          <h2 className="font-display text-3xl font-bold mb-8">Latest</h2>
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
        <section className="border-t border-border">
          <div className="container py-16 text-center">
            <Linkedin className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
            <h2 className="font-display text-2xl font-bold">Stay in the loop</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm">
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
