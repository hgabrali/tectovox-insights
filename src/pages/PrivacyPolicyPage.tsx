import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const PrivacyPolicyPage = () => {
  const lastUpdated = "March 19, 2026";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b bg-card">
          <div className="container max-w-2xl py-16 md:py-20 text-center">
            <h1 className="font-display text-4xl font-bold md:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="container max-w-2xl py-12 md:py-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">1. Introduction</h2>
              <p>
                tectovox ("we", "us", or "our") operates the website tectovox.com. This Privacy Policy
                explains how we collect, use, and protect information when you visit our website.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
              <p>
                tectovox is a content curation platform. We do not require user accounts or registration.
                We may collect limited information automatically:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website or link</li>
                <li>Device type and screen resolution</li>
                <li>IP address (anonymized where possible)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">3. How We Use Information</h2>
              <p>Any information collected is used solely to:</p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>Understand how visitors use the site and improve content</li>
                <li>Monitor site performance and fix technical issues</li>
                <li>Prevent abuse or malicious activity</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or share personal information with third parties for marketing purposes.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">4. Cookies</h2>
              <p>
                We may use essential cookies to ensure the website functions correctly. We may also use
                analytics cookies (e.g., privacy-focused analytics) to understand visitor behavior in
                aggregate. You can disable cookies in your browser settings at any time.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">5. Third-Party Links</h2>
              <p>
                tectovox curates and links to content from third-party sources. When you click an external
                link, you leave our website and are subject to the privacy policy of that third-party site.
                We are not responsible for the privacy practices of external websites.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">6. Content & Copyright</h2>
              <p>
                tectovox aggregates publicly available content from RSS feeds and public APIs. All articles
                link directly to their original sources. We display titles, excerpts, and thumbnails under
                fair use for informational purposes. If you are a content owner and wish to have your
                content removed, please contact us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">7. Data Retention</h2>
              <p>
                Analytics data is retained in aggregate form and does not identify individual users.
                We do not maintain user profiles or personal data stores.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">8. Children's Privacy</h2>
              <p>
                tectovox is not directed at children under 13. We do not knowingly collect information
                from children.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be reflected on this page
                with an updated revision date. Continued use of the site after changes constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">10. Contact</h2>
              <p>
                If you have questions about this Privacy Policy or wish to request content removal, contact us at:{" "}
                <a
                  href="mailto:info@tectovox.com"
                  className="underline hover:text-foreground transition-colors"
                >
                  info@tectovox.com
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

export default PrivacyPolicyPage;
