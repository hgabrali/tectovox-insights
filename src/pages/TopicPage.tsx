import { useParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { categoryConfig, type Category } from "@/lib/data";
import { mockArticles } from "@/lib/mock-data";
import { useState } from "react";

type SortOption = "date" | "relevance";

const TopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const [sort, setSort] = useState<SortOption>("date");

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
  const articles = mockArticles
    .filter((a) => a.category === category)
    .sort((a, b) => (sort === "date" ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0));

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

        {/* Sort controls */}
        <div className="container pt-8 pb-4 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          {(["date", "relevance"] as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                sort === opt ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
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
            <p className="text-center text-muted-foreground py-12">No articles in this category yet.</p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default TopicPage;
