import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/benefits", label: "Benefits" },
  { href: "/faq", label: "FAQ" },
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold"
                  data-testid="button-nav-get-started"
                >
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl z-[100]">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold">Choose Your Path</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1f2e] to-[#2a2f3e] p-6 text-white">
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-2">For Users</h3>
                      <p className="text-xl font-bold mb-4">Start my Fitness Journey</p>
                      <p className="text-sm text-white/70 mb-6">Are You a User?</p>
                      <div className="flex flex-col gap-3" role="group" aria-label="Download InstaTrainMe User App">
                        <a 
                          href="https://play.google.com/store/apps/details?id=com.instatrainme.user&pli=1" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block transition-transform hover:scale-105"
                          aria-label="Download InstaTrainMe fitness app on Google Play Store"
                          title="Download InstaTrainMe - Personal Trainer App for Android"
                          data-testid="nav-link-user-google-play"
                        >
                          <img src="https://instatrainme.com/googleplaydark.webp" alt="Get InstaTrainMe Personal Trainer App on Google Play" className="h-10" />
                        </a>
                        <a 
                          href="https://apps.apple.com/us/app/instatrainme/id6499338812" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block transition-transform hover:scale-105"
                          aria-label="Download InstaTrainMe fitness app on Apple App Store"
                          title="Download InstaTrainMe - Personal Trainer App for iOS"
                          data-testid="nav-link-user-app-store"
                        >
                          <img src="https://instatrainme.com/appstoreblack.webp" alt="Download InstaTrainMe Personal Trainer App on App Store" className="h-10" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#3a3020] to-[#4a4030] p-6 text-white">
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-2">For Trainers</h3>
                      <p className="text-xl font-bold mb-4">Provide Training with InstaTrainMe<sup className="text-xs">®</sup></p>
                      <p className="text-sm text-white/70 mb-6">Are You a Trainer?</p>
                      <div className="flex flex-col gap-3" role="group" aria-label="Download InstaTrainMe Trainer App">
                        <a 
                          href="https://play.google.com/store/apps/details?id=com.instatrainme.trainer.app" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block transition-transform hover:scale-105"
                          aria-label="Download InstaTrainMe Trainer app on Google Play Store"
                          title="Download InstaTrainMe Trainer - Manage Fitness Clients for Android"
                          data-testid="nav-link-trainer-google-play"
                        >
                          <img src="https://instatrainme.com/googleplaydark.webp" alt="Get InstaTrainMe Trainer App on Google Play" className="h-10" />
                        </a>
                        <a 
                          href="https://apps.apple.com/us/app/instatrainme-trainer/id6499338940" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block transition-transform hover:scale-105"
                          aria-label="Download InstaTrainMe Trainer app on Apple App Store"
                          title="Download InstaTrainMe Trainer - Manage Fitness Clients for iOS"
                          data-testid="nav-link-trainer-app-store"
                        >
                          <img src="https://instatrainme.com/appstoreblack.webp" alt="Download InstaTrainMe Trainer App on App Store" className="h-10" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold"
                        data-testid="button-mobile-get-started"
                      >
                        Get Started
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl z-[100]">
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">Choose Your Path</DialogTitle>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1f2e] to-[#2a2f3e] p-6 text-white">
                          <div className="relative z-10">
                            <h3 className="text-lg font-semibold mb-2">For Users</h3>
                            <p className="text-xl font-bold mb-4">Start my Fitness Journey</p>
                            <p className="text-sm text-white/70 mb-6">Are You a User?</p>
                            <div className="flex flex-col gap-3" role="group" aria-label="Download InstaTrainMe User App">
                              <a 
                                href="https://play.google.com/store/apps/details?id=com.instatrainme.user&pli=1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block transition-transform hover:scale-105"
                                aria-label="Download InstaTrainMe fitness app on Google Play Store"
                                title="Download InstaTrainMe - Personal Trainer App for Android"
                              >
                                <img src="https://instatrainme.com/googleplaydark.webp" alt="Get InstaTrainMe Personal Trainer App on Google Play" className="h-10" />
                              </a>
                              <a 
                                href="https://apps.apple.com/us/app/instatrainme/id6499338812" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block transition-transform hover:scale-105"
                                aria-label="Download InstaTrainMe fitness app on Apple App Store"
                                title="Download InstaTrainMe - Personal Trainer App for iOS"
                              >
                                <img src="https://instatrainme.com/appstoreblack.webp" alt="Download InstaTrainMe Personal Trainer App on App Store" className="h-10" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#3a3020] to-[#4a4030] p-6 text-white">
                          <div className="relative z-10">
                            <h3 className="text-lg font-semibold mb-2">For Trainers</h3>
                            <p className="text-xl font-bold mb-4">Provide Training with InstaTrainMe<sup className="text-xs">®</sup></p>
                            <p className="text-sm text-white/70 mb-6">Are You a Trainer?</p>
                            <div className="flex flex-col gap-3" role="group" aria-label="Download InstaTrainMe Trainer App">
                              <a 
                                href="https://play.google.com/store/apps/details?id=com.instatrainme.trainer.app" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block transition-transform hover:scale-105"
                                aria-label="Download InstaTrainMe Trainer app on Google Play Store"
                                title="Download InstaTrainMe Trainer - Manage Fitness Clients for Android"
                              >
                                <img src="https://instatrainme.com/googleplaydark.webp" alt="Get InstaTrainMe Trainer App on Google Play" className="h-10" />
                              </a>
                              <a 
                                href="https://apps.apple.com/us/app/instatrainme-trainer/id6499338940" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block transition-transform hover:scale-105"
                                aria-label="Download InstaTrainMe Trainer app on Apple App Store"
                                title="Download InstaTrainMe Trainer - Manage Fitness Clients for iOS"
                              >
                                <img src="https://instatrainme.com/appstoreblack.webp" alt="Download InstaTrainMe Trainer App on App Store" className="h-10" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
