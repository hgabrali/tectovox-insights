import { Cpu, Tv, MessageCircle, BookOpen, Megaphone, Newspaper, Play, AudioLines, BookMarked, LucideIcon } from "lucide-react";

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

export type Category = "technology" | "media" | "communication" | "philosophy" | "advertising";

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
};

export const sampleArticles: Article[] = [
  {
    id: "1",
    title: "The Rise of Autonomous AI Agents in Enterprise Software",
    excerpt: "Major tech companies are deploying AI agents that can independently plan, execute, and iterate on complex business workflows — raising questions about accountability and control.",
    category: "technology",
    contentType: "article",
    date: "2026-03-17",
    author: "Elena Vasquez",
    readTime: "6 min",
    trending: true,
  },
  {
    id: "2",
    title: "How Spatial Computing Is Redefining Broadcast Media",
    excerpt: "With mixed-reality headsets reaching mainstream adoption, broadcasters are reimagining the living room as a three-dimensional news stage.",
    category: "media",
    contentType: "video",
    date: "2026-03-17",
    author: "Marcus Chen",
    readTime: "12 min",
  },
  {
    id: "3",
    title: "The Collapse of Context: Communication in the Age of Fragments",
    excerpt: "As attention spans shrink and messaging platforms multiply, scholars warn that shared context — the foundation of meaningful dialogue — is eroding faster than ever.",
    category: "communication",
    contentType: "podcast",
    date: "2026-03-16",
    author: "Aisha Patel",
    readTime: "34 min",
    trending: true,
  },
  {
    id: "4",
    title: "Digital Consciousness and the Hard Problem: A 2026 Reassessment",
    excerpt: "New research in computational neuroscience reopens the debate on whether silicon substrates can produce genuine subjective experience.",
    category: "philosophy",
    contentType: "book",
    date: "2026-03-16",
    author: "Prof. James Whitmore",
    readTime: "280 pages",
    trending: true,
  },
  {
    id: "5",
    title: "Programmatic Creativity: When Algorithms Become Art Directors",
    excerpt: "The latest generation of AI creative tools is blurring the line between strategic media buying and original creative production.",
    category: "advertising",
    contentType: "article",
    date: "2026-03-15",
    author: "Sofia Andersson",
    readTime: "5 min",
  },
  {
    id: "6",
    title: "Quantum-Safe Encryption Standards Finally Arrive",
    excerpt: "NIST's newly ratified post-quantum cryptographic algorithms are now being adopted by cloud providers worldwide, marking a pivotal shift in cybersecurity.",
    category: "technology",
    contentType: "video",
    date: "2026-03-15",
    author: "David Kim",
    readTime: "18 min",
  },
  {
    id: "7",
    title: "The Newsletter Renaissance: Why Long-Form Email Is Thriving",
    excerpt: "Despite predictions of email's demise, independent newsletters are generating more revenue and reach than ever, challenging traditional media economics.",
    category: "media",
    contentType: "podcast",
    date: "2026-03-14",
    author: "Rachel Osei",
    readTime: "42 min",
  },
  {
    id: "8",
    title: "Wittgenstein's Ghost in the Machine Learning Pipeline",
    excerpt: "Language models process words without understanding meaning — a tension the philosopher anticipated nearly a century ago. What can we learn from his later work?",
    category: "philosophy",
    contentType: "article",
    date: "2026-03-14",
    author: "Dr. Hannah Meier",
    readTime: "8 min",
  },
  {
    id: "9",
    title: "Attention Markets: The True Currency of Digital Advertising",
    excerpt: "A new measurement framework proposes replacing impressions with verified attention seconds, threatening to upend the $600B digital ad industry.",
    category: "advertising",
    contentType: "book",
    date: "2026-03-13",
    author: "Tom Bradley",
    readTime: "320 pages",
    trending: true,
  },
  {
    id: "10",
    title: "Asynchronous Communication and the Death of the Meeting",
    excerpt: "Leading remote-first companies are eliminating real-time meetings entirely. Their communication protocols offer a glimpse at the future of distributed work.",
    category: "communication",
    contentType: "video",
    date: "2026-03-13",
    author: "Lin Wei",
    readTime: "22 min",
  },
];
