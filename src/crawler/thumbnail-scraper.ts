import { parse } from "node-html-parser";

const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE;

export async function fetchOGImage(url: string): Promise<string | null> {
  if (!BRIGHT_DATA_API_KEY || !BRIGHT_DATA_ZONE) {
    console.warn(
      "Bright Data credentials not configured — thumbnail scraping disabled"
    );
    return null;
  }

  try {
    const res = await fetch("https://api.brightdata.com/request", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zone: BRIGHT_DATA_ZONE,
        url,
        format: "raw",
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) return null;

    const html = await res.text();
    const root = parse(html);

    const ogImage = root.querySelector('meta[property="og:image"]');
    if (ogImage) {
      const content = ogImage.getAttribute("content");
      if (content) return content;
    }

    // Fallback: twitter:image
    const twitterImage = root.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      const content = twitterImage.getAttribute("content");
      if (content) return content;
    }

    return null;
  } catch (err) {
    console.error(
      `  Failed to fetch og:image for ${url}:`,
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
