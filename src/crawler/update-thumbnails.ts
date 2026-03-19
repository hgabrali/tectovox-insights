import "dotenv/config";
import { supabaseAdmin } from "./supabase-admin.js";
import { fetchOGImage, delay } from "./thumbnail-scraper.js";

async function updateThumbnails() {
  const { data: items, error } = await supabaseAdmin
    .from("items")
    .select("id, url, title, source_url")
    .is("image_url", null);

  if (error) {
    console.error("Failed to fetch items:", error.message);
    process.exit(1);
  }

  if (!items || items.length === 0) {
    console.log("No items with missing thumbnails.");
    return;
  }

  console.log(`Found ${items.length} items with missing thumbnails.\n`);

  let updated = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const targetUrl = item.url || item.source_url;

    if (!targetUrl) {
      console.log(`Skipping item ${item.id}: no URL`);
      continue;
    }

    const imageUrl = await fetchOGImage(targetUrl);

    if (imageUrl) {
      const { error: updateError } = await supabaseAdmin
        .from("items")
        .update({ image_url: imageUrl })
        .eq("id", item.id);

      if (updateError) {
        console.error(`Failed to update "${item.title}":`, updateError.message);
      } else {
        updated++;
        console.log(`Updated ${updated}/${items.length}: ${item.title}`);
      }
    } else {
      console.log(`No image found for: ${item.title}`);
    }

    if (i < items.length - 1) {
      await delay(500);
    }
  }

  console.log(`\nDone. Updated ${updated}/${items.length} items.`);
}

updateThumbnails();
