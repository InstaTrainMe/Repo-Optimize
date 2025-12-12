import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Benefits" },
  { href: "/blog", label: "Blog" },
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (href: string) => {
    setLocation(href);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-5 gap-4">
        <button 
          onClick={() => setLocation("/")}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#667eea] to-[#764ba2] cursor-pointer border-0 bg-transparent" 
          data-testid="link-logo"
        >
          InstaTrainMe<span className="text-[#667eea]">®</span>
        </button>

        <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant={location === link.href ? "secondary" : "ghost"}
              className="font-medium"
              onClick={() => handleNavClick(link.href)}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <div className="hidden md:block">
            <Button
              className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold"
              data-testid="button-nav-get-started"
            >
              Get Started
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8" data-testid="nav-mobile">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant={location === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start font-medium text-lg"
                    onClick={() => handleNavClick(link.href)}
                    data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Button>
                ))}
                <div className="pt-4 border-t">
                  <Button
                    className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold"
                    onClick={() => setIsOpen(false)}
                    data-testid="button-mobile-get-started"
                  >
                    Get Started
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
