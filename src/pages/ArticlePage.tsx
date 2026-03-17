import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { categoryConfig } from "@/lib/data";
import { mockArticles } from "@/lib/mock-data";
import { ArrowLeft, Linkedin, Twitter, Link2, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockArticles.find((a) => a.id === id);

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

  const config = categoryConfig[article.category];
  const Icon = config.icon;
  const related = sampleArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  // Generate placeholder body paragraphs
  const bodyParagraphs = [
    article.excerpt,
    "The implications of this development extend far beyond its immediate domain. Industry observers note that the convergence of multiple technological and cultural forces creates an environment where change accelerates exponentially, leaving traditional institutions struggling to adapt.",
    "According to leading researchers in the field, the key challenge lies not in the technology itself, but in the frameworks we use to understand and govern it. \"We need new mental models,\" argues one prominent scholar. \"The old categories simply don't apply anymore.\"",
    "This perspective aligns with a broader shift in how professionals across technology, media, and communication think about their work. The boundaries between disciplines are dissolving, replaced by a more integrated understanding of how information, meaning, and value flow through complex systems.",
    "Looking ahead, the trend suggests that organizations willing to embrace interdisciplinary thinking — drawing on philosophy, communication theory, and technological literacy in equal measure — will be best positioned to navigate the uncertainties ahead.",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container pt-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>

        {/* Article header */}
        <article className="container max-w-3xl py-8">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.color}`}>
            <Icon className="h-3.5 w-3.5" />
            {config.label}
          </span>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {article.author}
            </span>
            <span>{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {article.readTime} read
            </span>
          </div>

          {/* Featured image placeholder */}
          <div className="mt-8 flex h-64 items-center justify-center rounded-lg bg-muted md:h-80">
            <Icon className="h-16 w-16 text-muted-foreground/20" />
          </div>

          {/* Share buttons */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Share:</span>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Link2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Body */}
          <div className="mt-10 space-y-6">
            {bodyParagraphs.map((p, i) => (
              <p key={i} className="text-base leading-[1.8] text-foreground/90">
                {i === 0 ? <span className="font-medium text-foreground">{p}</span> : p}
              </p>
            ))}
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="border-t">
            <div className="container py-12">
              <h2 className="font-display text-xl font-bold mb-6">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
