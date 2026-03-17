import { useParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterBar } from "@/components/FilterBar";
import { categoryConfig, type Category } from "@/lib/data";
import { mockArticles } from "@/lib/mock-data";
import { useContentFilters } from "@/hooks/use-content-filters";

const TopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const { filters, setFilter, clearFilters, applyFilters } = useContentFilters();

  const category = topic as Category;
  const config = categoryConfig[category];

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Topic not found</h1>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const Icon = config.icon;
  const articles = applyFilters(mockArticles, category);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Topic Header */}
        <section className="border-b bg-card">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h1 className="font-display text-3xl font-bold">{config.label}</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{config.description}</p>
          </div>
        </section>

        {/* Filters */}
        <div className="container pt-8 pb-4">
          <FilterBar filters={filters} setFilter={setFilter} clearFilters={clearFilters} />
        </div>

        {/* Articles */}
        <section className="container pb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          {articles.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No articles match your filters.</p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default TopicPage;
