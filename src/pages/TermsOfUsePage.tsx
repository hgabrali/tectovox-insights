import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const TermsOfUsePage = () => {
  const lastUpdated = "March 19, 2026";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b bg-card">
          <div className="container max-w-2xl py-16 md:py-20 text-center">
            <h1 className="font-display text-4xl font-bold md:text-5xl">Terms of Use</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="container max-w-2xl py-12 md:py-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using tectovox.com ("the Site"), you agree to be bound by these Terms of Use.
                If you do not agree with any part of these terms, please do not use the Site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
              <p>
                tectovox is a content curation platform that aggregates publicly available articles, news,
                and media from RSS feeds and public APIs. We provide links, titles, excerpts, and thumbnails
                for informational purposes. All content links to its original source.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">3. Intellectual Property</h2>
              <p>
                The tectovox name, logo, design, and original editorial content are the property of tectovox.
                Third-party content displayed on the Site remains the intellectual property of its respective
                owners. We display such content under fair use for informational and educational purposes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Use of the Site</h2>
              <p>You agree to use the Site only for lawful purposes. You may not:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>Scrape, crawl, or systematically download content from the Site without permission</li>
                <li>Attempt to interfere with or disrupt the Site's functionality</li>
                <li>Use the Site to distribute malware, spam, or harmful content</li>
                <li>Misrepresent your identity or affiliation with any person or organization</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Third-Party Links</h2>
              <p>
                The Site contains links to third-party websites. We are not responsible for the content,
                accuracy, or practices of external sites. Visiting third-party links is at your own risk
                and subject to their respective terms and policies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Disclaimer of Warranties</h2>
              <p>
                The Site and its content are provided "as is" without warranties of any kind, either express
                or implied. We do not guarantee the accuracy, completeness, or timeliness of any content
                displayed on the Site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, tectovox shall not be liable for any direct, indirect,
                incidental, or consequential damages arising from your use of the Site or reliance on any
                content provided herein.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms of Use at any time. Changes will be posted on this
                page with an updated revision date. Continued use of the Site after any changes constitutes
                acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">9. Contact</h2>
              <p>
                If you have questions about these Terms of Use, contact us at:{" "}
                <a
                  href="mailto:hande.gabrali@gmail.com"
                  className="underline hover:text-foreground transition-colors"
                >
                  hande.gabrali@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default TermsOfUsePage;
