import { Cpu, Tv, MessageCircle, BookOpen, Megaphone, Newspaper, Play, AudioLines, BookMarked, Sparkles, GraduationCap, LucideIcon } from "lucide-react";

export type ContentType = "article" | "video" | "podcast" | "book";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  contentType: ContentType;
  date: string;
  author: string;
  imageUrl?: string;
  readTime: string;
  trending?: boolean;
  sourceUrl: string;
  isBriefing?: boolean;
}

export type Category = "technology" | "media" | "communication" | "philosophy" | "advertising" | "ai" | "academia";

export const contentTypeConfig: Record<ContentType, { label: string; icon: LucideIcon; color: string }> = {
  article: {
    label: "Article",
    icon: Newspaper,
    color: "bg-foreground/8 text-foreground border-foreground/15",
  },
  video: {
    label: "Video",
    icon: Play,
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
  podcast: {
    label: "Podcast",
    icon: AudioLines,
    color: "bg-accent/10 text-accent border-accent/20",
  },
  book: {
    label: "Publication",
    icon: BookMarked,
    color: "bg-philosophy/10 text-philosophy border-philosophy/20",
  },
};

export const categoryConfig: Record<Category, { label: string; color: string; icon: LucideIcon; description: string }> = {
  technology: {
    label: "Technology",
    color: "bg-tech/10 text-tech border-tech/20",
    icon: Cpu,
    description: "Exploring breakthroughs in AI, quantum computing, biotech, and the systems shaping tomorrow's world.",
  },
  media: {
    label: "Media",
    color: "bg-media/10 text-media border-media/20",
    icon: Tv,
    description: "Analyzing the evolution of digital media, content ecosystems, and the future of storytelling.",
  },
  communication: {
    label: "Communication",
    color: "bg-communication/10 text-communication border-communication/20",
    icon: MessageCircle,
    description: "Understanding how language, networks, and platforms reshape human connection and discourse.",
  },
  philosophy: {
    label: "Philosophy",
    color: "bg-philosophy/10 text-philosophy border-philosophy/20",
    icon: BookOpen,
    description: "Examining the ethical, existential, and epistemological questions raised by technological progress.",
  },
  advertising: {
    label: "Advertising",
    color: "bg-advertising/10 text-advertising border-advertising/20",
    icon: Megaphone,
    description: "Dissecting the strategies, technologies, and cultural forces driving modern brand communication.",
  },
  ai: {
    label: "AI",
    color: "bg-ai/10 text-ai border-ai/20",
    icon: Sparkles,
    description: "Tracking the latest in artificial intelligence — from foundational models to real-world applications and societal impact.",
  },
  academia: {
    label: "Academia",
    color: "bg-academia/10 text-academia border-academia/20",
    icon: GraduationCap,
    description: "Highlighting research, scholarly discourse, and the evolving landscape of higher education and knowledge production.",
  },
};
