import "dotenv/config";
import { SOURCES } from "./sources.js";
import { fetchRSSFeed } from "./rss-fetcher.js";
import { saveItems } from "./save-items.js";

async function main() {
  console.log(`Starting crawl of ${SOURCES.length} sources...\n`);

  let totalFetched = 0;

  for (const source of SOURCES) {
    try {
      console.log(`Fetching: ${source.name} (${source.topic})`);
      const items = await fetchRSSFeed(source);
      const withThumb = items.filter((i) => i.thumbnail !== null).length;
      console.log(
        `  Found ${items.length} items — ${withThumb} with thumbnails, ${items.length - withThumb} null`
      );
      totalFetched += items.length;
      await saveItems(items);
    } catch (err) {
      console.error(
        `  Error fetching ${source.name}:`,
        err instanceof Error ? err.message : err
      );
    }
  }

  console.log(`\nCrawl complete. ${totalFetched} total items processed.`);
}

main();
