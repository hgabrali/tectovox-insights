import { Link } from "react-router-dom";
import { Linkedin, Twitter, Rss } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-lg font-bold tracking-tight">
              tecto<span className="text-primary">vox</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Curating the intersection of technology, media, communication, philosophy, and advertising — daily.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h4 className="font-display text-sm font-bold mb-1">Navigation</h4>
            {["Technology", "Media", "Communication", "Philosophy", "Advertising", "About"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Legal & Social */}
          <div className="flex flex-col gap-2">
            <h4 className="font-display text-sm font-bold mb-1">Legal</h4>
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Use</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Rss className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 space-y-3 text-center text-xs text-muted-foreground">
          <p className="max-w-lg mx-auto leading-relaxed">
            tectovox curates publicly available content from RSS feeds. All articles link to original sources. For removal requests:{" "}
            <a href="mailto:info@tectovox.com" className="underline hover:text-foreground transition-colors">info@tectovox.com</a>
          </p>
          <p>© {new Date().getFullYear()} tectovox.com — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
