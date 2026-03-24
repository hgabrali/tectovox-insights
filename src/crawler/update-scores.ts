import "dotenv/config";
import { supabaseAdmin } from "./supabase-admin.js";
import { calculateRelevanceScore } from "./save-items.js";

const BATCH_SIZE = 50;

async function updateScores() {
  const { data: items, error } = await supabaseAdmin
    .from("items")
    .select("id, title, source_name, content_type, category, published_at")
    .eq("relevance_score", 0);

  if (error) {
    console.error("Failed to fetch items:", error.message);
    process.exit(1);
  }

  if (!items || items.length === 0) {
    console.log("No items with relevance_score = 0.");
    return;
  }

  console.log(`Found ${items.length} items to update.\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);

    const updates = batch.map((item) => {
      const { relevance_score, source_quality } = calculateRelevanceScore({
        source_name: item.source_name,
        published_at: item.published_at,
        content_type: item.content_type,
        topic: item.category,
        title: item.title,
      });
      return { id: item.id, relevance_score, source_quality };
    });

    for (const update of updates) {
      const { error: updateError } = await supabaseAdmin
        .from("items")
        .update({
          relevance_score: update.relevance_score,
          source_quality: update.source_quality,
        })
        .eq("id", update.id);

      if (updateError) {
        console.error(`Failed to update item ${update.id}:`, updateError.message);
        failed++;
      } else {
        updated++;
      }
    }

    console.log(`Progress: ${Math.min(i + BATCH_SIZE, items.length)}/${items.length} processed`);
  }

  console.log(`\nDone. Updated ${updated} items, ${failed} failures.`);
}

updateScores();
