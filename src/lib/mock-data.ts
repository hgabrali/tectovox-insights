import type { Article, Category, ContentType } from "./data";

const categories: Category[] = ["technology", "media", "communication", "philosophy", "advertising", "ai", "academia", "data-science"];
const contentTypes: ContentType[] = ["article", "video", "podcast", "book"];

const titles: Record<Category, string[]> = {
  technology: [
    "The Rise of Autonomous AI Agents in Enterprise Software",
    "Quantum-Safe Encryption Standards Finally Arrive",
    "Inside the Race to Build Neuromorphic Chips",
    "The Innovator's Dilemma Revisited: AI Edition",
    "Edge Computing Goes Mainstream as 5G Matures",
    "Why Rust Is Replacing C++ in Safety-Critical Systems",
    "The Hidden Environmental Cost of Training Foundation Models",
    "Synthetic Biology Startups Attract Record Venture Capital",
    "WebAssembly Beyond the Browser: A Systems Programming Renaissance",
    "Zero-Knowledge Proofs Move from Theory to Production",
    "Robotics in Healthcare: Surgical Precision Meets AI Planning",
    "The Chip Wars Escalate: Export Controls and Innovation",
  ],
  media: [
    "How Spatial Computing Is Redefining Broadcast Media",
    "The Newsletter Renaissance: Why Long-Form Email Is Thriving",
    "Synthetic Anchors: The Ethics of AI-Generated News Presenters",
    "Attention Factory: How TikTok Rewired Global Media",
    "Podcasting's Second Golden Age: What Changed",
    "The Death of the Homepage and the Rise of Feed Culture",
    "Interactive Documentaries: A New Grammar for Nonfiction",
    "Local News Deserts and the Civic Information Crisis",
    "Streaming Wars 3.0: The Bundling Paradox Returns",
    "Citizen Journalism in Conflict Zones: Ethics and Impact",
    "How Generative AI Is Reshaping Stock Photography",
    "The Future of Music Distribution in a Post-Streaming World",
  ],
  communication: [
    "The Collapse of Context: Communication in the Age of Fragments",
    "Asynchronous Communication and the Death of the Meeting",
    "How Language Models Are Changing Corporate Rhetoric",
    "The Empathy Gap: Digital Communication and Emotional Intelligence",
    "Cross-Cultural Video Conferencing: What Gets Lost in Translation",
    "The Rise of Voice-First Interfaces in Enterprise Workflows",
    "Communication Overload: When More Channels Mean Less Clarity",
    "How Gen Z Communicates: Memes, Voice Notes, and Disappearing Text",
    "The Return of the Telephone Call: Why Voice Is Making a Comeback",
    "Nonverbal Cues in Virtual Meetings: The Science of Digital Body Language",
    "Internal Communication Audits: What Fortune 500 Companies Are Learning",
    "The Semiotics of Emoji: How Pictographs Reshape Written Discourse",
  ],
  philosophy: [
    "Digital Consciousness and the Hard Problem: A 2026 Reassessment",
    "Wittgenstein's Ghost in the Machine Learning Pipeline",
    "Justice in the Algorithm: Rawls Meets Recommender Systems",
    "Techne and Telos: Technology as a Philosophical Category",
    "The Ethics of Longevity: Should We Engineer Immortality?",
    "Epistemology in the Age of Deepfakes: What Counts as Knowledge?",
    "Simulated Worlds and the Simulation Argument: An Update",
    "Moral Machines: Can Autonomous Systems Be Ethical Agents?",
    "The Phenomenology of Virtual Reality Experiences",
    "Free Will and Predictive Algorithms: A Compatibilist Response",
    "Hannah Arendt and the Public Sphere in Digital Democracy",
    "Philosophy of Mind Meets Transformer Architecture",
  ],
  advertising: [
    "Programmatic Creativity: When Algorithms Become Art Directors",
    "Attention Markets: The True Currency of Digital Advertising",
    "The Brand Voice Paradox: Authenticity in an AI-Written World",
    "Subprime Attention Crisis: Advertising and the Time Bomb at the Heart of the Internet",
    "Retail Media Networks: The Third Wave of Digital Advertising",
    "Influencer Marketing at Scale: From Niche to Mass Reach",
    "Privacy-First Advertising: Life After Third-Party Cookies",
    "The Super Bowl Ad Economy: Is the 30-Second Spot Still Worth It?",
    "Dynamic Creative Optimization: Personalization or Manipulation?",
    "Audio Advertising Surges as Podcast Audiences Double",
    "How DTC Brands Are Rewriting the Advertising Playbook",
    "Neuromarketing in 2026: Measuring Emotion at the Speed of Thought",
  ],
  ai: [
    "GPT-5 and the Dawn of Reasoning Machines",
    "AI Governance Frameworks: Who Regulates the Regulators?",
    "Multimodal Models Are Redefining Human-Computer Interaction",
    "The Open Source AI Movement Gains Momentum",
    "AI in Drug Discovery: From Lab to Market in Record Time",
    "Foundation Models Meet Robotics: Embodied Intelligence Arrives",
  ],
  academia: [
    "The Replication Crisis Enters Its Second Decade",
    "Open Access Publishing: A Progress Report",
    "How AI Is Transforming Peer Review",
    "The Future of the University in a Post-AI World",
    "Interdisciplinary Research: Breaking Down Departmental Silos",
    "Academic Freedom Under Pressure: A Global Survey",
  ],
  "data-science": [
    "How Feature Stores Are Becoming the Backbone of ML Pipelines",
    "The Rise of DataOps: Bringing DevOps Practices to Data Teams",
    "Causal Inference vs Correlation: Why It Matters for Business Decisions",
    "Real-Time Analytics at Scale: Stream Processing Architectures",
    "The Data Lakehouse Paradigm: Unifying Warehouses and Lakes",
    "AutoML Is Democratizing Predictive Modeling Across Industries",
  ],
};

const excerpts: Record<Category, string[]> = {
  technology: [
    "Major tech companies are deploying AI agents that can independently plan, execute, and iterate on complex business workflows.",
    "NIST's newly ratified post-quantum cryptographic algorithms are now being adopted by cloud providers worldwide.",
    "A new generation of processors modeled on the human brain promises radically lower power consumption and faster inference.",
    "Clayton Christensen's seminal framework gets a 2026 update examining how generative AI is disrupting the disruptors.",
    "As 5G networks mature, edge computing is moving from experimental to essential for latency-sensitive applications.",
    "Memory safety concerns are driving a generational shift in systems programming languages across the industry.",
    "New research quantifies the carbon footprint of training large language models — and the numbers are staggering.",
    "Synthetic biology startups raised over $12B in 2025, signaling a new era of programmable living systems.",
    "WebAssembly is expanding beyond browsers into cloud, IoT, and blockchain runtimes, challenging containers and VMs.",
    "ZK proofs are enabling private transactions, verifiable credentials, and trustless computation at production scale.",
    "AI-assisted surgical robots are achieving unprecedented precision, but questions about liability persist.",
    "Geopolitical tensions around semiconductor manufacturing are reshaping global technology supply chains.",
  ],
  media: [
    "With mixed-reality headsets reaching mainstream adoption, broadcasters are reimagining the living room as a 3D news stage.",
    "Despite predictions of email's demise, independent newsletters are generating more revenue and reach than ever.",
    "Several Asian broadcasters now use entirely AI-generated anchors for 24/7 news coverage.",
    "An exhaustive investigation into how short-form video reshaped content creation and journalism.",
    "Podcasting's revenue model has matured, with dynamic ad insertion and premium subscriptions driving growth.",
    "Users increasingly discover content through algorithmic feeds, making traditional website homepages irrelevant.",
    "A new breed of interactive documentaries lets viewers choose their own narrative paths through complex stories.",
    "More than 1,800 U.S. communities now lack a local news outlet, creating information vacuums with civic consequences.",
    "After years of unbundling, streaming services are re-aggregating into familiar cable-like packages.",
    "The rise of smartphone journalism in conflict zones raises urgent questions about safety and verification.",
    "AI image generators are disrupting the $4B stock photography industry — and photographers are fighting back.",
    "Artists and labels are exploring direct-to-fan models as streaming royalty rates continue to decline.",
  ],
  communication: [
    "As attention spans shrink and messaging platforms multiply, shared context — the foundation of dialogue — is eroding.",
    "Leading remote-first companies are eliminating real-time meetings entirely for asynchronous protocols.",
    "Executives increasingly rely on AI-drafted communications, homogenizing corporate language.",
    "A comprehensive study exploring how screen-mediated interaction reshapes our capacity for empathy.",
    "Subtle cultural differences in eye contact, turn-taking, and silence create friction in global video calls.",
    "Voice assistants are becoming the primary interface for enterprise tasks, from scheduling to data queries.",
    "Employees report spending 28 hours per week on communication tools, but feeling less informed than ever.",
    "Generation Z's communication preferences are reshaping workplace norms and platform design.",
    "After years of text dominance, voice calls are seeing a surprising resurgence among younger demographics.",
    "Researchers are cataloging the micro-expressions and gestures that convey meaning in virtual meeting environments.",
    "Major corporations are conducting formal audits of internal communication effectiveness with surprising results.",
    "The rapid evolution of emoji usage patterns reveals deep shifts in how we construct meaning in text.",
  ],
  philosophy: [
    "New research in computational neuroscience reopens the debate on whether silicon can produce subjective experience.",
    "Language models process words without understanding meaning — a tension the philosopher anticipated a century ago.",
    "If algorithms allocate opportunity and resources, should they satisfy Rawlsian fairness criteria?",
    "Tracing the concept of technology from Aristotle through Heidegger to the present day.",
    "Advances in geroscience raise profound questions about the meaning of a finite human life.",
    "In a world where any image or video can be fabricated, traditional epistemology faces its greatest challenge.",
    "New computational arguments refine Bostrom's simulation hypothesis with testable predictions.",
    "As autonomous systems make life-and-death decisions, the question of machine morality becomes urgent.",
    "Philosophers examine what VR experiences reveal about the nature of perception and embodiment.",
    "If an algorithm can predict your choices, does that undermine free will — or confirm compatibilism?",
    "Arendt's concept of the public sphere takes on new urgency in the age of social media and algorithmic curation.",
    "Transformer architectures raise novel questions about representation, computation, and understanding.",
  ],
  advertising: [
    "The latest generation of AI creative tools is blurring the line between media buying and creative production.",
    "A new framework proposes replacing impressions with verified attention seconds in the $600B ad industry.",
    "As brands adopt generative AI for copywriting, consumers crave more human and emotionally resonant messaging.",
    "An updated critique arguing that digital advertising's metrics are fundamentally unreliable.",
    "Retailers are building their own ad platforms, creating a third major channel after search and social.",
    "Micro-influencers are proving more effective than celebrities for brand engagement across most categories.",
    "The deprecation of third-party cookies is forcing advertisers to rethink targeting from the ground up.",
    "Despite rising costs, the Super Bowl remains advertising's most coveted stage — but for how long?",
    "AI-powered creative systems can generate thousands of ad variants, but the ethical questions multiply.",
    "As podcast audiences double, audio advertising technology and measurement are catching up fast.",
    "Direct-to-consumer brands are pioneering new advertising strategies that legacy brands are scrambling to copy.",
    "Brain-computer interfaces and eye-tracking are enabling real-time emotional measurement in ad testing.",
  ],
  ai: [
    "OpenAI's latest model demonstrates genuine multi-step reasoning across scientific and mathematical domains.",
    "Nations race to establish AI governance frameworks, but coordination remains elusive.",
    "Models that process text, images, audio, and video simultaneously are changing how we interact with machines.",
    "Community-driven AI projects challenge the dominance of proprietary foundation models.",
    "AI-powered drug discovery platforms are compressing timelines from decades to months.",
    "Large language models are being paired with robotic systems to create agents that can perceive and act in the physical world.",
  ],
  academia: [
    "Failed replications continue to shake confidence in landmark studies across psychology and biomedicine.",
    "The shift to open access is accelerating, but sustainable funding models remain elusive.",
    "AI-assisted peer review promises faster turnaround but raises concerns about bias and accountability.",
    "Universities grapple with how to remain relevant as AI democratizes access to knowledge.",
    "Funding agencies increasingly reward cross-disciplinary collaboration, reshaping academic incentives.",
    "A comprehensive survey reveals growing threats to academic freedom across multiple continents.",
  ],
};

const authors = [
  "Elena Vasquez", "David Kim", "Priya Ramachandran", "Dr. Michael Torres",
  "Marcus Chen", "Rachel Osei", "Tomoko Ishida", "Alexei Volkov",
  "Aisha Patel", "Lin Wei", "Carla Mendes", "Dr. Sarah Lindqvist",
  "Prof. James Whitmore", "Dr. Hannah Meier", "Prof. Amara Okafor", "Dr. Konstantin Petrov",
  "Sofia Andersson", "Tom Bradley", "Jenna Liu", "Tim Hwang",
];

function generateArticles(): Article[] {
  const articles: Article[] = [];
  let id = 1;

  // Generate articles spanning from March 2026 back to October 2025
  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const year = 2026;
    const month = 3 - monthOffset; // March, Feb, Jan, Dec, Nov, Oct
    const adjustedYear = month <= 0 ? year - 1 : year;
    const adjustedMonth = month <= 0 ? month + 12 : month;

    for (let catIdx = 0; catIdx < categories.length; catIdx++) {
      const cat = categories[catIdx];
      // 2-3 articles per category per month
      const count = monthOffset === 0 ? 3 : 2;
      for (let j = 0; j < count; j++) {
        const titleIdx = (monthOffset * 2 + j) % titles[cat].length;
        const excerptIdx = titleIdx % excerpts[cat].length;
        const typeIdx = (catIdx + j + monthOffset) % contentTypes.length;
        const day = Math.max(1, 28 - j * 7 - monthOffset * 3);
        const dateStr = `${adjustedYear}-${String(adjustedMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const authorIdx = (catIdx * 4 + j + monthOffset) % authors.length;

        const contentType = contentTypes[typeIdx];
        let readTime: string;
        switch (contentType) {
          case "article": readTime = `${4 + (id % 7)} min`; break;
          case "video": readTime = `${10 + (id % 20)} min`; break;
          case "podcast": readTime = `${30 + (id % 25)} min`; break;
          case "book": readTime = `${200 + (id % 150)} pages`; break;
        }

        const sourceUrls: Record<string, string> = {
          article: "https://example.com/articles/",
          video: "https://youtube.com/watch?v=",
          podcast: "https://podcasts.example.com/episodes/",
          book: "https://books.example.com/publications/",
        };

        articles.push({
          id: `arc-${id}`,
          title: titles[cat][titleIdx],
          excerpt: excerpts[cat][excerptIdx],
          category: cat,
          contentType,
          date: dateStr,
          author: authors[authorIdx],
          readTime,
          trending: id % 7 === 0,
          sourceUrl: `${sourceUrls[contentType]}${cat}-${id}`,
        });
        id++;
      }
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const mockArticles: Article[] = generateArticles();
