import { supabaseAdmin } from "./supabase-admin.js";
import { checkDuplicate } from "./deduplicator.js";
import type { CrawledItem } from "./types.js";

export async function saveItems(items: CrawledItem[]): Promise<void> {
  let saved = 0;
  let skipped = 0;

  for (const item of items) {
    const isDuplicate = await checkDuplicate(item.url);
    if (isDuplicate) {
      skipped++;
      continue;
    }

    const { error } = await supabaseAdmin.from("items").upsert(
      {
        title: item.title,
        url: item.url,
        summary: item.summary,
        thumbnail: item.thumbnail,
        source_name: item.source_name,
        content_type: item.content_type,
        topic: item.topic,
        published_at: item.published_at,
      },
      { onConflict: "url" }
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
