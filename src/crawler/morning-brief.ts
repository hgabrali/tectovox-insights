import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "./supabase-admin";

const anthropic = new Anthropic();

type Session = "morning" | "afternoon" | "evening";

const SESSION_CONFIG: Record<Session, { hoursBack: number; tone: string }> = {
  morning: {
    hoursBack: 8,
    tone: "Start of day briefing — what happened overnight",
  },
  afternoon: {
    hoursBack: 5,
    tone: "Midday update — what's developing right now",
  },
  evening: {
    hoursBack: 6,
    tone: "End of day wrap-up — today's most important stories",
  },
};

function getSession(): Session {
  const env = process.env.BRIEF_SESSION;
  if (env === "morning" || env === "afternoon" || env === "evening") return env;
  return "morning";
}

async function fetchTopItems(hoursBack: number) {
  const since = new Date(Date.now() - hoursBack * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from("items")
    .select("title, excerpt")
    .gte("published_at", since)
    .order("relevance_score", { ascending: false })
    .limit(30);

  if (error) throw new Error(`Failed to fetch items: ${error.message}`);
  if (!data || data.length === 0) throw new Error(`No items found in last ${hoursBack} hours`);

  console.log(`Fetched ${data.length} items for brief generation`);
  return data;
}

async function generateBrief(
  articles: { title: string; excerpt: string }[],
  language: string,
  tone: string,
): Promise<string> {
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

Tone: ${tone}

Based on these recent articles, write a brief with 5-7 bullet points highlighting the most important developments. Each bullet point should be 1-2 sentences max. Be sharp, insightful, and editorial.

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

async function saveBrief(session: Session, contentEn: string, contentTr: string) {
  const today = new Date().toISOString().split("T")[0];

  const { error } = await supabaseAdmin
    .from("briefs")
    .upsert(
      { date: today, session, content_en: contentEn, content_tr: contentTr },
      { onConflict: "date,session" },
    );

  if (error) throw new Error(`Failed to save brief: ${error.message}`);
  console.log(`Brief saved for ${today} [${session}]`);
}

async function main() {
  const session = getSession();
  const config = SESSION_CONFIG[session];

  console.log(`Starting ${session} brief generation (last ${config.hoursBack}h)...`);

  const articles = await fetchTopItems(config.hoursBack);

  const [contentEn, contentTr] = await Promise.all([
    generateBrief(articles, "English", config.tone),
    generateBrief(articles, "Turkish", config.tone),
  ]);

  console.log("\n=== English Brief ===");
  console.log(contentEn);
  console.log("\n=== Turkish Brief ===");
  console.log(contentTr);

  await saveBrief(session, contentEn, contentTr);
  console.log(`${session.charAt(0).toUpperCase() + session.slice(1)} brief generation complete!`);
}

main().catch((err) => {
  console.error("Brief generation failed:", err);
  process.exit(1);
});
