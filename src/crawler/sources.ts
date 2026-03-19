export interface Source {
  name: string;
  feedUrl: string;
  topic: string;
  content_type: "news" | "video" | "podcast" | "book";
  skipTitleLengthCheck?: boolean;
  maxItems?: number;
}

export interface YouTubeSource {
  name: string;
  channelId: string;
  topic: string;
  content_type: "video";
  maxItems?: number;
}

export const SOURCES: Source[] = [
  // Technology
  {
    name: "TechCrunch",
    feedUrl: "https://techcrunch.com/feed/",
    topic: "technology",
    content_type: "news",
    maxItems: 10,
  },
  {
    name: "Wired",
    feedUrl: "https://www.wired.com/feed/rss",
    topic: "technology",
    content_type: "news",
    maxItems: 10,
  },
  {
    name: "MIT Technology Review",
    feedUrl: "https://www.technologyreview.com/feed/",
    topic: "technology",
    content_type: "news",
    maxItems: 10,
  },
  // Media
  {
    name: "Nieman Lab",
    feedUrl: "https://www.niemanlab.org/feed/",
    topic: "media",
    content_type: "news",
    maxItems: 15,
  },
  {
    name: "Poynter",
    feedUrl: "https://www.poynter.org/feed/",
    topic: "media",
    content_type: "news",
    maxItems: 15,
  },
  // Advertising
  {
    name: "AdExchanger",
    feedUrl: "https://adexchanger.com/feed/",
    topic: "advertising",
    content_type: "news",
    maxItems: 10,
  },
  // Technology
  {
    name: "The Verge",
    feedUrl: "https://www.theverge.com/rss/index.xml",
    topic: "technology",
    content_type: "news",
    maxItems: 10,
  },
  // Philosophy
  {
    name: "Aeon Magazine",
    feedUrl: "https://aeon.co/feed.rss",
    topic: "philosophy",
    content_type: "news",
    skipTitleLengthCheck: true,
    maxItems: 15,
  },
  // Communication
  {
    name: "Columbia Journalism Review",
    feedUrl: "https://www.cjr.org/feed",
    topic: "communication",
    content_type: "news",
    maxItems: 15,
  },
  {
    name: "Press Gazette",
    feedUrl: "https://pressgazette.co.uk/feed/",
    topic: "communication",
    content_type: "news",
    maxItems: 15,
  },
  // AI / LLM / Data Science
  {
    name: "MIT AI News",
    feedUrl: "https://news.mit.edu/rss/research",
    topic: "ai",
    content_type: "news",
    maxItems: 5,
  },
  {
    name: "Stanford HAI",
    feedUrl: "https://hai.stanford.edu/news/rss.xml",
    topic: "ai",
    content_type: "news",
    maxItems: 5,
  },
  {
    name: "DeepMind Blog",
    feedUrl: "https://deepmind.google/blog/rss.xml",
    topic: "ai",
    content_type: "news",
    maxItems: 5,
  },
  {
    name: "Hugging Face Blog",
    feedUrl: "https://huggingface.co/blog/feed.xml",
    topic: "ai",
    content_type: "news",
    skipTitleLengthCheck: true,
    maxItems: 5,
  },
  {
    name: "Towards Data Science",
    feedUrl: "https://towardsdatascience.com/feed",
    topic: "ai",
    content_type: "news",
    maxItems: 5,
  },
  {
    name: "The Gradient",
    feedUrl: "https://thegradient.pub/rss/",
    topic: "ai",
    content_type: "news",
    maxItems: 5,
  },
  {
    name: "Import AI",
    feedUrl: "https://jack-clark.net/feed/",
    topic: "ai",
    content_type: "news",
    maxItems: 5,
  },
];

export const YOUTUBE_SOURCES: YouTubeSource[] = [
  // Academia
  {
    name: "MIT OpenCourseWare",
    channelId: "UCEBb1b_L6zDS3xTUrIALZOw",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "Stanford Online",
    channelId: "UCBa5G_ESCn8Yd4vw5U-gIcg",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "Oxford University",
    channelId: "UCK8f1CUe8y403u3b0gCINww",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "Harvard University",
    channelId: "UCLv7Gzc3VTO6ggFlXY0sOyw",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "Berkeley EECS",
    channelId: "UCEBb1b_L6zDS3xTUrIALZOw",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "Andrej Karpathy",
    channelId: "UCbfYPyITQ-7l4upoX8nvctg",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "Lex Fridman",
    channelId: "UCSHZKyawb77ixDdsGog4iWA",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "3Blue1Brown",
    channelId: "UCYO_jab_esuFRV4b17AJtAw",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
  {
    name: "Demis Hassabis (DeepMind)",
    channelId: "UCP7jMXSY2xbc3KCAE0MHQ-A",
    topic: "academia",
    content_type: "video",
    maxItems: 5,
  },
];
