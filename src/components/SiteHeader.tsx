import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          tecto<span className="text-primary">vox</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[1.5px] after:bg-foreground after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${
                location.pathname === link.to
                  ? "text-foreground after:scale-x-100"
                  : "text-muted-foreground hover:text-foreground"
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
              placeholder="Search…"
              className="hidden w-48 rounded-md border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary sm:block"
              onBlur={() => setSearchOpen(false)}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-transparent"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="border-t bg-background pb-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-foreground"
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
