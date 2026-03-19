import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Mail, Coffee } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-card">
          <div className="container max-w-2xl py-16 md:py-24 text-center">
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Why <span className="text-primary">tectovox</span> exists
            </h1>
          </div>
        </section>

        {/* Body */}
        <section className="container max-w-2xl py-16 md:py-20">
          <div className="space-y-6 text-muted-foreground leading-relaxed text-[1.05rem]">
            <p className="text-foreground font-display text-xl font-semibold italic">
              Honestly? FOMO.
            </p>

            <p>
              I built tectovox because I was tired of missing things. AI papers dropping while I was
              in a meeting. A philosopher saying something brilliant on a podcast I hadn't discovered
              yet. A media trend everyone was talking about except me.
            </p>

            <p>
              So I built the site I always wanted — one place where technology, media, AI, philosophy,
              advertising and academia actually talk to each other. No paywalls. No newsletters I'd
              forget to unsubscribe from. Just the good stuff, updated daily, curated by a very
              persistent algorithm (and occasional human judgment).
            </p>

            <p>
              tectovox is a personal project. It's not a startup. There's no team. No investors. No
              editorial board. Just curiosity, a bit of code, and the stubborn belief that staying
              informed should be effortless.
            </p>
          </div>

          {/* Built with */}
          <div className="mt-16 border-t border-border pt-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Coffee className="h-4 w-4 shrink-0" />
              <p>
                Built with RSS feeds, YouTube API, Bright Data, Supabase, and too much coffee.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <p>
              Say hi:{" "}
              <a
                href="mailto:hande.gabrali@gmail.com"
                className="underline hover:text-foreground transition-colors"
              >
                hande.gabrali@gmail.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AboutPage;
