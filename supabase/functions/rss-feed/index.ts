import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: items, error } = await supabase
      .from("items")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    const now = new Date().toUTCString();

    const itemsXml = (items ?? [])
      .map(
        (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.source_url)}</link>
      <description>${escapeXml(item.excerpt)}</description>
      <pubDate>${new Date(item.published_at).toUTCString()}</pubDate>
      <guid isPermaLink="false">${item.id}</guid>
      <category>${escapeXml(item.category)}</category>
    </item>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>tectovox — Daily Briefings</title>
    <link>https://tectovox.com</link>
    <description>Curating the intersection of technology, media, communication, philosophy, and advertising — daily.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="https://tectovox.com/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=900",
      },
    });
  } catch (err) {
    return new Response(`Error generating feed: ${err instanceof Error ? err.message : String(err)}`, {
      status: 500,
      headers: corsHeaders,
    });
  }
});
