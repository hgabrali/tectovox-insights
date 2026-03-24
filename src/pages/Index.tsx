import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import { TopTenNews } from "@/components/TopTenNews";
import { MorningBriefSection } from "@/components/MorningBrief";
import { TopSourcesSection } from "@/components/TopSources";
import { categoryConfig } from "@/lib/data";
import { useItems } from "@/hooks/use-items";

import { useContentFilters } from "@/hooks/use-content-filters";
import { ArticleGridSkeleton, EmptyState, ErrorState } from "@/components/ContentStates";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import mascotImg from "@/assets/mascot-sitting.png";
import { Newspaper, Layers, RefreshCw, Coffee } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ""));
    if (isNaN(num) || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * num).toString());
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplay(target);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-3xl md:text-4xl font-black text-foreground">
      {display}{suffix}
    </span>
  );
}

const statCards = [
  { icon: Newspaper, value: "1000", suffix: "+", label: "Articles" },
  { icon: Layers, value: "8", suffix: "", label: "Categories" },
  { icon: RefreshCw, value: "24", suffix: "/7", label: "Updated" },
  { icon: Coffee, value: "3", suffix: "x", label: "Daily Brief" },
];

const Index = () => {
  const { filters, setFilter, clearFilters, applyFilters } = useContentFilters();
  const { data: allItems = [], isLoading, isError, refetch } = useItems({ limit: 20, sortBy: filters.sort });
  

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
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container pt-12 pb-14 md:pt-20 md:pb-20">
            {/* Stat counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative rounded-2xl border border-border bg-card px-4 py-5 md:px-6 md:py-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]"
                  >
                    <Icon className="h-5 w-5 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="mt-1 text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Main headline */}
            <h1 className="font-display text-6xl font-black leading-[1.05] md:text-8xl lg:text-[100px] text-foreground">
              <span className="relative inline-block">T<img
                  src={mascotImg}
                  alt="tectovox mascot"
                  className="absolute bottom-[55%] left-1/2 -translate-x-1/2 h-[56px] w-[56px] md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px] object-contain pointer-events-auto cursor-pointer z-10 mix-blend-multiply"
                /></span>ech. Media. <em className="not-italic font-display italic text-primary">Ideas.</em>
            </h1>
            <p className="mt-5 text-sm font-medium text-muted-foreground tracking-wider uppercase">
              {dateStr}
            </p>
            <div className="mt-8 h-px bg-border" />
          </div>
        </section>

        {/* Morning Brief */}
        <MorningBriefSection />

        {/* Top Sources This Week */}
        <TopSourcesSection />


        {/* Category Pills */}
        <section className="border-b border-border bg-secondary/30">
          <div className="container py-6">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {Object.entries(categoryConfig).map(([key, val]) => {
                const Icon = val.icon;
                return (
                  <Link
                    key={key}
                    to={`/${key}`}
                    className={`group shrink-0 inline-flex items-center gap-2.5 rounded-2xl border-2 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg ${val.color} hover:scale-[1.03]`}
                    style={{ minWidth: "fit-content" }}
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
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
