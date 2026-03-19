import Parser from "rss-parser";
import type { Source } from "./sources.js";
import type { CrawledItem } from "./types.js";
import { fetchOGImage, delay } from "./thumbnail-scraper.js";

const parser = new Parser();

const VALID_CONTENT_TYPES = new Set(["news", "video", "podcast", "book"]);

const LOW_QUALITY_TITLE_KEYWORDS = [
  "promo code",
  "coupon",
  "discount code",
  "% off",
  "deals",
  "sale",
  "voucher",
  "cashback",
];

const LOW_QUALITY_URL_PATTERNS = [
  "/coupons/",
  "/deals/",
  "/promo/",
  "/vouchers/",
];

function isLowQualityItem(title: string, url: string, skipTitleLengthCheck = false): boolean {
  const lowerTitle = title.toLowerCase();
  if (!skipTitleLengthCheck && lowerTitle.length < 25) return true;
  if (LOW_QUALITY_TITLE_KEYWORDS.some((kw) => lowerTitle.includes(kw))) return true;
  const lowerUrl = url.toLowerCase();
  if (LOW_QUALITY_URL_PATTERNS.some((p) => lowerUrl.includes(p))) return true;
  return false;
}

function resolveContentType(
  type: string
): "news" | "video" | "podcast" | "book" {
  if (VALID_CONTENT_TYPES.has(type)) {
    return type as "news" | "video" | "podcast" | "book";
  }
  return "news";
}

function extractThumbnail(item: Record<string, unknown>): string | null {
  // 1. Standard RSS enclosure
  const enclosure = item.enclosure as { url?: string } | undefined;
  if (enclosure?.url) return enclosure.url;

  // 2. Podcast feeds (itunes:image)
  const itunes = item.itunes as { image?: string } | undefined;
  if (itunes?.image) return itunes.image;

  // 3. Media RSS content
  const mediaContent = item["media:content"] as { $?: { url?: string } } | undefined;
  if (mediaContent?.$?.url) return mediaContent.$.url;

  // 4. Media RSS thumbnail
  const mediaThumbnail = item["media:thumbnail"] as { $?: { url?: string } } | undefined;
  if (mediaThumbnail?.$?.url) return mediaThumbnail.$.url;

  // 5. Extract first <img> src from content
  const content = (item.content ?? item["content:encoded"]) as string | undefined;
  if (content) {
    const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match?.[1]) return match[1];
  }

  return null;
}

export async function fetchRSSFeed(source: Source): Promise<CrawledItem[]> {
  const feed = await parser.parseURL(source.feedUrl);
  const contentType = resolveContentType(source.content_type);

  const durationTitlePattern = /\s+-\s+\d+[smh]$/;

  const validItems = feed.items.filter((item) => {
    if (!item.title || !item.link) return false;
    if (durationTitlePattern.test(item.title)) return false;
    return true;
  });

  const beforeCount = validItems.length;
  const qualityItems = validItems.filter(
    (item) => !isLowQualityItem(item.title!, item.link!, source.skipTitleLengthCheck)
  );
  const filteredOut = beforeCount - qualityItems.length;
  if (filteredOut > 0) {
    console.log(
      `[${source.name}] Filtered out ${filteredOut} low-quality item(s)`
    );
  }

  const items: CrawledItem[] = qualityItems.map((item) => ({
      title: item.title!,
      url: item.link!,
      summary: item.contentSnippet?.slice(0, 500) ?? "",
      thumbnail: extractThumbnail(item as unknown as Record<string, unknown>),
      source_name: source.name,
      content_type: contentType,
      topic: source.topic,
      published_at: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
    }));

  // Scrape og:image for items missing thumbnails
  for (const item of items) {
    if (item.thumbnail === null) {
      item.thumbnail = await fetchOGImage(item.url);
      await delay(500);
    }
  }

  return items;
}
