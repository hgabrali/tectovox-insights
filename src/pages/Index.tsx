import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import { categoryConfig } from "@/lib/data";
import { mockArticles } from "@/lib/mock-data";
import { useContentFilters } from "@/hooks/use-content-filters";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { filters, setFilter, clearFilters, applyFilters } = useContentFilters();
  const topStory = mockArticles[0];
  const trending = mockArticles.filter((a) => a.trending);
  const filtered = applyFilters(mockArticles.slice(1));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero / Daily Briefing */}
        <section className="border-b bg-card">
          <div className="container py-12 md:py-20">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
              <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
              Daily Briefing — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </div>
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                {topStory.isBriefing ? (
                <Link to={`/article/${topStory.id}`} className="group">
                  <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl lg:text-5xl transition-colors group-hover:text-primary">
                    {topStory.title}
                  </h1>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl">
                    {topStory.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Read full briefing <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
                ) : (
                <a href={topStory.sourceUrl} target="_blank" rel="noopener noreferrer" className="group">
                  <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl lg:text-5xl transition-colors group-hover:text-primary">
                    {topStory.title}
                  </h1>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl">
                    {topStory.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Read at source <ArrowRight className="h-4 w-4" />
                  </div>
                </a>
                )}
              </div>

              {/* Trending sidebar */}
              <aside className="lg:col-span-2 lg:border-l lg:pl-8">
                <h3 className="font-display text-sm font-semibold flex items-center gap-2 mb-4 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" /> Trending Now
                </h3>
                <div className="flex flex-col gap-4">
                  {trending.map((article, i) => {
                    const config = categoryConfig[article.category];
                    return article.isBriefing ? (
                        <Link
                          key={article.id}
                          to={`/article/${article.id}`}
                          className="group flex gap-3"
                        >
                          <span className="font-display text-2xl font-bold text-muted-foreground/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${config.color}`}>
                              {config.label}
                            </span>
                            <h4 className="mt-1 text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                              {article.title}
                            </h4>
                          </div>
                        </Link>
                      ) : (
                        <a
                          key={article.id}
                          href={article.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex gap-3"
                        >
                          <span className="font-display text-2xl font-bold text-muted-foreground/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${config.color}`}>
                              {config.label}
                            </span>
                            <h4 className="mt-1 text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                              {article.title}
                            </h4>
                          </div>
                        </a>
                      );
                  })}
                </div>
              </aside>
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => (
              <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No articles match your filters.</p>
          )}
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
