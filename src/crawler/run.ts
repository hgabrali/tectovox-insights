import "dotenv/config";
import { SOURCES, YOUTUBE_SOURCES } from "./sources.js";
import { fetchRSSFeed } from "./rss-fetcher.js";
import { fetchYouTubeChannel } from "./youtube-fetcher.js";
import { saveItems } from "./save-items.js";

async function main() {
  const totalSources = SOURCES.length + YOUTUBE_SOURCES.length;
  console.log(`Starting crawl of ${totalSources} sources...\n`);

  let totalFetched = 0;

  // RSS sources
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

  // YouTube sources
  if (YOUTUBE_SOURCES.length > 0) {
    if (!process.env.YOUTUBE_API_KEY) {
      console.log(
        "\nSkipping YouTube sources — YOUTUBE_API_KEY not set.\n"
      );
    } else {
      console.log(`\nFetching ${YOUTUBE_SOURCES.length} YouTube channels...\n`);
      for (const source of YOUTUBE_SOURCES) {
        try {
          console.log(`Fetching: ${source.name} (${source.topic})`);
          const items = await fetchYouTubeChannel(source);
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
    }
  }

  console.log(`\nCrawl complete. ${totalFetched} total items processed.`);
}

main();
