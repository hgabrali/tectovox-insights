import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";
import { categoryConfig } from "@/lib/data";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-card">
          <div className="container max-w-3xl py-16 md:py-24 text-center">
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              About <span className="text-primary">tectovox</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              tectovox is a daily briefing platform that curates and analyzes the most important
              developments at the nexus of technology, media, communication, philosophy, and advertising.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="container max-w-3xl py-16">
          <h2 className="font-display text-2xl font-bold mb-6">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              In an era of information overload, tectovox exists to provide clarity. We believe that the
              most important developments in our world happen at the intersections — where technology meets
              philosophy, where media reshapes communication, where advertising reflects and drives culture.
            </p>
            <p>
              Our editorial team scours hundreds of sources daily to distill the signals from the noise,
              delivering concise, insightful briefings to professionals, innovators, and thinkers who need
              to stay ahead of the curve.
            </p>
          </div>

          {/* Coverage areas */}
          <h2 className="font-display text-2xl font-bold mt-16 mb-6">What We Cover</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(categoryConfig).map(([key, val]) => {
              const Icon = val.icon;
              return (
                <div key={key} className="rounded-lg border bg-card p-5">
                  <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${val.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-semibold">{val.label}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>

          {/* Team placeholder */}
          <h2 className="font-display text-2xl font-bold mt-16 mb-6">Our Team</h2>
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              tectovox is built by a small team of researchers, journalists, and technologists
              passionate about the future of human knowledge and communication.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Team profiles coming soon.</p>
          </div>

          {/* Contact */}
          <h2 className="font-display text-2xl font-bold mt-16 mb-6">Get in Touch</h2>
          <div className="rounded-lg border bg-card p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="your@email.com" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium">Message</label>
              <textarea className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary min-h-[120px]" placeholder="Your message..." />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button>
                <Mail className="mr-2 h-4 w-4" /> Send Message
              </Button>
              <Button variant="outline">
                <Linkedin className="mr-2 h-4 w-4" /> Follow on LinkedIn
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AboutPage;
