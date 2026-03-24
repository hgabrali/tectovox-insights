import { useTopSources, type SourceStat } from "@/hooks/use-top-sources";
import { categoryConfig, type Category } from "@/lib/data";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const categoryHslMap: Record<Category, string> = {
  technology: "hsl(var(--tech))",
  media: "hsl(var(--media))",
  communication: "hsl(var(--communication))",
  philosophy: "hsl(var(--philosophy))",
  advertising: "hsl(var(--advertising))",
  ai: "hsl(var(--ai))",
  academia: "hsl(var(--academia))",
  "data-science": "hsl(var(--data-science))",
};

function truncate(text: string, max = 60) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function truncateDomain(text: string, max = 20) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function TopSourcesSkeleton() {
  return (
    <section className="container py-10">
      <Skeleton className="h-8 w-56 mb-6" />
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </section>
  );
}

function ArticleLinks({ articles }: { articles: SourceStat["recentArticles"] }) {
  if (articles.length === 0) return null;
  return (
    <div className="flex flex-col gap-1 mt-1.5 ml-1">
      {articles.map((a, i) => (
        <a
          key={i}
          href={a.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors truncate"
        >
          → {truncate(a.title)}
        </a>
      ))}
    </div>
  );
}

export function TopSourcesSection() {
  const { data: sources = [], isLoading } = useTopSources();

  if (isLoading) return <TopSourcesSkeleton />;
  if (sources.length === 0) return null;

  const chartData = sources.map((s) => ({
    name: s.sourceName,
    count: s.count,
    category: s.category,
  }));

  return (
    <section className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Top Sources This Week
        </h2>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        {/* Chart */}
        <div className="w-full" style={{ height: Math.max(sources.length * 48, 200) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={160}
                tick={{ fontSize: 13, fill: "hsl(var(--foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  fontSize: 13,
                }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Bar
                dataKey="count"
                radius={[0, 8, 8, 0]}
                animationDuration={1200}
                animationEasing="ease-out"
                label={{
                  position: "right",
                  fontSize: 12,
                  fontWeight: 700,
                  fill: "hsl(var(--foreground))",
                }}
              >
                {chartData.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={categoryHslMap[entry.category] ?? "hsl(var(--primary))"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent articles per source */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sources.map((s) => (
            <div key={s.sourceName} className="border-l-2 border-border pl-3">
              <span className="text-sm font-semibold text-foreground">
                {s.sourceName}
              </span>
              <ArticleLinks articles={s.recentArticles} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
