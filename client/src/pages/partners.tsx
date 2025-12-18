import { Link } from "wouter";
import { useCanonical } from "@/hooks/useCanonical";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { ArrowLeft, ExternalLink, Moon, Sun, Users, Handshake } from "lucide-react";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="button-theme-toggle"
      className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}

const partners = [
  {
    name: "FitTeam",
    description: "Join the FitTeam community and access exclusive fitness resources through InstaTrainMe.",
    url: "https://fitteam.com/instatrainme",
    icon: Users,
  },
  {
    name: "Wellzy Perks",
    description: "Get wellness perks and discounts when you join through InstaTrainMe.",
    url: "https://wellzyperks.com/join/instatrainme/",
    icon: Handshake,
  },
];

export default function Partners() {
  useCanonical("/partners");
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-5 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <ThemeToggle />
        <Navigation />
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-16">
          <h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            data-testid="text-partners-title"
          >
            Our Partners
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            InstaTrainMe<sup>®</sup> works with trusted partners to bring you the best fitness experience.
          </p>
        </div>
      </section>

      <section className="py-16 px-5 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <Card 
                key={partner.name}
                className="border-0 shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`card-partner-${index}`}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg">
                    <partner.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{partner.name}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {partner.description}
                  </p>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#667eea] font-medium hover:underline"
                    data-testid={`link-partner-${index}`}
                  >
                    Visit {partner.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/">
            <Button 
              variant="outline" 
              className="rounded-full px-8"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
