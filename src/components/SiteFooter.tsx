import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Brand */}
          <Link to="/" className="font-display text-lg font-bold tracking-tight">
            tecto<span className="text-primary">vox</span>
          </Link>

          {/* Links */}
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} tectovox.com
          </p>
        </div>
      </div>
    </footer>
  );
}
