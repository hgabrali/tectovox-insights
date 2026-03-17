import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { sampleArticles, categoryConfig } from "@/lib/data";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const topStory = sampleArticles[0];
  const trending = sampleArticles.filter((a) => a.trending);
  const latest = sampleArticles.slice(1);

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
              </div>

              {/* Trending sidebar */}
              <aside className="lg:col-span-2 lg:border-l lg:pl-8">
                <h3 className="font-display text-sm font-semibold flex items-center gap-2 mb-4 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" /> Trending Now
                </h3>
                <div className="flex flex-col gap-4">
                  {trending.map((article, i) => {
                    const config = categoryConfig[article.category];
                    return (
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

        {/* Content Grid */}
        <section className="container py-12">
          <h2 className="font-display text-2xl font-bold mb-8">Latest Updates</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article, i) => (
              <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t bg-card">
          <div className="container py-16 text-center">
            <Mail className="mx-auto h-8 w-8 text-primary mb-4" />
            <h2 className="font-display text-2xl font-bold">Stay Informed</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Get the daily tectovox briefing delivered to your inbox. No spam, just signal.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
