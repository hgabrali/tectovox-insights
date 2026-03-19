import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "./supabase-admin";

const anthropic = new Anthropic();

async function fetchTopItems() {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from("items")
    .select("title, excerpt")
    .gte("published_at", since)
    .order("relevance_score", { ascending: false })
    .limit(30);

  if (error) throw new Error(`Failed to fetch items: ${error.message}`);
  if (!data || data.length === 0) throw new Error("No items found in last 24 hours");

  console.log(`Fetched ${data.length} items for brief generation`);
  return data;
}

async function generateBrief(articles: { title: string; excerpt: string }[], language: string): Promise<string> {
  const articlesText = articles
    .map((a, i) => `${i + 1}. ${a.title}${a.excerpt ? ` — ${a.excerpt}` : ""}`)
    .join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `You are an editor for tectovox.com, a daily intelligence briefing covering technology, media, AI, philosophy, advertising and academia.

Based on these articles from the last 24 hours, write a Morning Brief with 5-7 bullet points highlighting the most important developments. Each bullet point should be 1-2 sentences max. Be sharp, insightful, and editorial.

Write in ${language}. Format: bullet points only, no intro text.

Articles:
${articlesText}`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}

async function saveBrief(contentEn: string, contentTr: string) {
  const today = new Date().toISOString().split("T")[0];

  const { error } = await supabaseAdmin
    .from("briefs")
    .upsert({ date: today, content_en: contentEn, content_tr: contentTr }, { onConflict: "date" });

  if (error) throw new Error(`Failed to save brief: ${error.message}`);
  console.log(`Brief saved for ${today}`);
}

async function main() {
  console.log("Starting Morning Brief generation...");

  const articles = await fetchTopItems();

  const [contentEn, contentTr] = await Promise.all([
    generateBrief(articles, "English"),
    generateBrief(articles, "Turkish"),
  ]);

  console.log("\n=== English Brief ===");
  console.log(contentEn);
  console.log("\n=== Turkish Brief ===");
  console.log(contentTr);

  await saveBrief(contentEn, contentTr);
  console.log("Morning Brief generation complete!");
}

main().catch((err) => {
  console.error("Morning Brief failed:", err);
  process.exit(1);
});
