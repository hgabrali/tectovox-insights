export interface Source {
  name: string;
  feedUrl: string;
  topic: string;
  content_type: "news" | "video" | "podcast" | "book";
}

export const SOURCES: Source[] = [
  // Technology
  {
    name: "TechCrunch",
    feedUrl: "https://techcrunch.com/feed/",
    topic: "technology",
    content_type: "news",
  },
  {
    name: "Wired",
    feedUrl: "https://www.wired.com/feed/rss",
    topic: "technology",
    content_type: "news",
  },
  {
    name: "MIT Technology Review",
    feedUrl: "https://www.technologyreview.com/feed/",
    topic: "technology",
    content_type: "news",
  },
  // Media
  {
    name: "Nieman Lab",
    feedUrl: "https://www.niemanlab.org/feed/",
    topic: "media",
    content_type: "news",
  },
  {
    name: "Poynter",
    feedUrl: "https://www.poynter.org/feed/",
    topic: "media",
    content_type: "news",
  },
  // Advertising
  {
    name: "AdExchanger",
    feedUrl: "https://adexchanger.com/feed/",
    topic: "advertising",
    content_type: "news",
  },
  // Technology
  {
    name: "The Verge",
    feedUrl: "https://www.theverge.com/rss/index.xml",
    topic: "technology",
    content_type: "news",
  },
  // Philosophy
  {
    name: "Aeon Magazine",
    feedUrl: "https://aeon.co/feed.rss",
    topic: "philosophy",
    content_type: "news",
  },
  // Communication
  {
    name: "Columbia Journalism Review",
    feedUrl: "https://www.cjr.org/feed",
    topic: "communication",
    content_type: "news",
  },
  {
    name: "Press Gazette",
    feedUrl: "https://pressgazette.co.uk/feed/",
    topic: "communication",
    content_type: "news",
  },
];
