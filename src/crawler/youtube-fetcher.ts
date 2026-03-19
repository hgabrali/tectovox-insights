import type { YouTubeSource } from "./sources.js";
import type { CrawledItem } from "./types.js";

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

export async function fetchYouTubeChannel(
  source: YouTubeSource
): Promise<CrawledItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not set in environment variables");
  }

  const params = new URLSearchParams({
    key: apiKey,
    channelId: source.channelId,
    order: "date",
    maxResults: String(source.maxItems ?? 5),
    type: "video",
    part: "snippet",
  });

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params}`
  );

  if (!res.ok) {
    throw new Error(`YouTube API error ${res.status}: ${await res.text()}`);
  }

  const data: YouTubeSearchResponse = await res.json();

  return data.items.map((item) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    summary: item.snippet.description?.slice(0, 500) ?? "",
    thumbnail:
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.medium?.url ??
      item.snippet.thumbnails.default?.url ??
      null,
    source_name: source.name,
    content_type: "video" as const,
    topic: source.topic,
    published_at: item.snippet.publishedAt,
  }));
}
