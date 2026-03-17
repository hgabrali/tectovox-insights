import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryConfig } from "@/lib/data";

const navLinks: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  ...Object.entries(categoryConfig).map(([key, val]) => ({
    label: val.label,
    to: `/${key}`,
  })),
  { label: "Archive", to: "/archive" },
  { label: "About", to: "/about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      // Switch after scrolling past ~80% of viewport (hero height)
      setScrolled(window.scrollY > window.innerHeight * 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-card/95 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          <span className={isTransparent ? "text-hero-foreground" : ""}>tecto</span>
          <span className="text-primary">vox</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isTransparent
                  ? location.pathname === link.to
                    ? "text-primary"
                    : "text-hero-foreground/80 hover:text-hero-foreground hover:bg-hero-foreground/10"
                  : location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {searchOpen && (
            <input
              autoFocus
              type="text"
              placeholder="Search articles..."
              className="hidden w-48 rounded-md border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary sm:block"
              onBlur={() => setSearchOpen(false)}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className={isTransparent ? "text-hero-foreground/80 hover:text-hero-foreground hover:bg-hero-foreground/10" : "text-muted-foreground"}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${isTransparent ? "text-hero-foreground/80 hover:text-hero-foreground hover:bg-hero-foreground/10" : "text-muted-foreground"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="border-t bg-card pb-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
