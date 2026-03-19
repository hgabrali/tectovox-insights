export interface Source {
  name: string;
  feedUrl: string;
  topic: string;
  content_type: "news" | "video" | "podcast" | "book";
  skipTitleLengthCheck?: boolean;
}

export interface YouTubeSource {
  name: string;
  channelId: string;
  topic: string;
  content_type: "video";
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
    skipTitleLengthCheck: true,
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
  // AI / LLM / Data Science
  {
    name: "MIT AI News",
    feedUrl: "https://news.mit.edu/rss/topic/artificial-intelligence",
    topic: "ai",
    content_type: "news",
  },
  {
    name: "Stanford HAI",
    feedUrl: "https://hai.stanford.edu/news/feed",
    topic: "ai",
    content_type: "news",
  },
  {
    name: "DeepMind Blog",
    feedUrl: "https://deepmind.google/blog/rss.xml",
    topic: "ai",
    content_type: "news",
  },
  {
    name: "Hugging Face Blog",
    feedUrl: "https://huggingface.co/blog/feed.xml",
    topic: "ai",
    content_type: "news",
  },
  {
    name: "Towards Data Science",
    feedUrl: "https://towardsdatascience.com/feed",
    topic: "ai",
    content_type: "news",
  },
  {
    name: "The Gradient",
    feedUrl: "https://thegradient.pub/rss/",
    topic: "ai",
    content_type: "news",
  },
  {
    name: "Import AI",
    feedUrl: "https://importai.substack.com/feed",
    topic: "ai",
    content_type: "news",
  },
];

export const YOUTUBE_SOURCES: YouTubeSource[] = [
  // Academia
  {
    name: "MIT OpenCourseWare",
    channelId: "UCEBb1b_L6zDS3xTUrIALZOw",
    topic: "academia",
    content_type: "video",
  },
  {
    name: "Stanford Online",
    channelId: "UClBRE2e-MuQ4ND8lUBMwGCQ",
    topic: "academia",
    content_type: "video",
  },
  {
    name: "Oxford University",
    channelId: "UC55auOmZwoSR7T4QMGej6Gg",
    topic: "academia",
    content_type: "video",
  },
  {
    name: "Harvard University",
    channelId: "UCX4sTkbKgvpR1CqIvRnKpCA",
    topic: "academia",
    content_type: "video",
  },
  {
    name: "Berkeley EECS",
    channelId: "UCEBb1b_L6zDS3xTUrIALZOw",
    topic: "academia",
    content_type: "video",
  },
  {
    name: "Andrej Karpathy",
    channelId: "UCbfYPyITQ-7l4upoX8nvctg",
    topic: "academia",
    content_type: "video",
  },
  {
    name: "Lex Fridman",
    channelId: "UCSHZKyawb77ixDdsGog4iWA",
    topic: "academia",
    content_type: "video",
  },
  {
    name: "3Blue1Brown",
    channelId: "UCYO_jab_esuFRV4b17AJtAg",
    topic: "academia",
    content_type: "video",
  },
];
