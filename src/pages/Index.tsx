import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import { TopTenNews } from "@/components/TopTenNews";
import { TopStorySection } from "@/components/TopStory";
import { MorningBriefSection } from "@/components/MorningBrief";
import { categoryConfig } from "@/lib/data";
import { useItems } from "@/hooks/use-items";
import { useTopStories } from "@/hooks/use-top-stories";
import { useContentFilters } from "@/hooks/use-content-filters";
import { ArticleGridSkeleton, EmptyState, ErrorState } from "@/components/ContentStates";
import { Link } from "react-router-dom";
import mascotImg from "@/assets/mascot-sitting.png";

const Index = () => {
  const { filters, setFilter, clearFilters, applyFilters } = useContentFilters();
  const { data: allItems = [], isLoading, isError, refetch } = useItems({ limit: 20, sortBy: filters.sort });
  const { data: topStories = [], isLoading: isLoadingTop } = useTopStories();

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
                className="absolute bottom-[55%] left-1/2 -translate-x-1/2 h-[56px] w-[56px] md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px] object-contain pointer-events-auto cursor-pointer z-10 mix-blend-multiply"
              /></span>ech. Media. <em className="not-italic font-display italic text-primary">Ideas.</em>
          </h1>
          <p className="mt-4 text-sm font-medium text-muted-foreground tracking-wide uppercase">
            {dateStr}
          </p>
          <div className="mt-8 h-px bg-border" />
        </section>

        {/* Top Story + Also Worth Reading */}
        <TopStorySection
          topStory={topStories[0] ?? null}
          alsoWorthReading={topStories.slice(1)}
          isLoading={isLoadingTop}
        />

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

      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
