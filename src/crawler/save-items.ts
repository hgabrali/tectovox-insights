import { supabaseAdmin } from "./supabase-admin.js";
import { checkDuplicate } from "./deduplicator.js";
import type { CrawledItem } from "./types.js";

const PREMIUM_SOURCES = new Set([
  "MIT",
  "Stanford",
  "DeepMind",
  "Aeon",
  "CJR",
  "Nieman Lab",
]);

const GOOD_SOURCES = new Set([
  "TechCrunch",
  "Wired",
  "AdExchanger",
  "Press Gazette",
]);

function getSourceQuality(sourceName: string): number {
  if (PREMIUM_SOURCES.has(sourceName)) return 3;
  if (GOOD_SOURCES.has(sourceName)) return 2;
  return 1;
}

function getRecencyBonus(publishedAt: string): number {
  const ageMs = Date.now() - new Date(publishedAt).getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  if (ageHours <= 2) return 5;
  if (ageHours <= 6) return 3;
  if (ageHours <= 24) return 1;
  return 0;
}

function getContentTypeBonus(contentType: string, sourceName: string): number {
  let bonus = 0;
  if (contentType === "video") bonus += 2;
  if (contentType === "article" && PREMIUM_SOURCES.has(sourceName)) bonus += 1;
  return bonus;
}

function calculateRelevanceScore(item: CrawledItem): { relevance_score: number; source_quality: number } {
  const source_quality = getSourceQuality(item.source_name);
  const recencyBonus = getRecencyBonus(item.published_at);
  const contentTypeBonus = getContentTypeBonus(item.content_type, item.source_name);
  return {
    relevance_score: source_quality + recencyBonus + contentTypeBonus,
    source_quality,
  };
}

export async function saveItems(items: CrawledItem[]): Promise<void> {
  let saved = 0;
  let skipped = 0;

  for (const item of items) {
    const isDuplicate = await checkDuplicate(item.url);
    if (isDuplicate) {
      skipped++;
      continue;
    }

    const { relevance_score, source_quality } = calculateRelevanceScore(item);

    const { error } = await supabaseAdmin.from("items").upsert(
      {
        url: item.url,
        title: item.title,
        source_url: item.url,
        excerpt: item.summary,
        image_url: item.thumbnail,
        source_name: item.source_name,
        content_type: item.content_type,
        category: item.topic,
        published_at: item.published_at,
        relevance_score,
        source_quality,
      },
      { onConflict: "source_url" }
    );

    if (error) {
      console.error(`Failed to save "${item.title}":`, error.message);
      skipped++;
    } else {
      saved++;
    }
  }

  console.log(`Saved ${saved} new items, skipped ${skipped} duplicates`);
}
