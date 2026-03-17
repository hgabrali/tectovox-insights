export interface CrawledItem {
  title: string;
  url: string;
  summary: string;
  thumbnail: string | null;
  source_name: string;
  content_type: string;
  topic: string;
  published_at: string;
}
