import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTheme } from "@/components/theme-provider";
import { Target, TrendingUp, DollarSign, Download, Users, Calendar, Dumbbell, Heart, Zap, MapPin, Mail, Building2, User, ChevronRight, Twitter, MessageCircle, Moon, Sun, Instagram, Facebook, Briefcase, ExternalLink, HelpCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { Navigation } from "@/components/navigation";

function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

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

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end items-center text-center px-5 pb-24 pt-20 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-poster.jpg"
        data-testid="video-hero-background"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <ThemeToggle />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-white text-[#667eea] font-semibold px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
                aria-label="Get started with InstaTrainMe"
                data-testid="button-get-started"
              >
                <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl z-[100]">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">Choose Your Path</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1f2e] to-[#2a2f3e] p-6 text-white">
                  <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2">For Users</h3>
                    <p className="text-xl font-bold mb-4">Start my Fitness Journey</p>
                    <p className="text-sm text-white/70 mb-6">Are You a User?</p>
                    <div className="flex flex-col gap-3">
                      <a 
                        href="https://play.google.com/store/apps/details?id=com.instatrainme.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-105"
                        data-testid="link-user-google-play"
                      >
                        <img src="https://instatrainme.com/googleplaydark.webp" alt="Get it on Google Play" className="h-10" />
                      </a>
                      <a 
                        href="https://apps.apple.com/us/app/instatrainme/id1554932398" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-105"
                        data-testid="link-user-app-store"
                      >
                        <img src="https://instatrainme.com/appstoreblack.webp" alt="Download on the App Store" className="h-10" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#3a3020] to-[#4a4030] p-6 text-white">
                  <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2">For Trainers</h3>
                    <p className="text-xl font-bold mb-4">Provide Training with InstaTrainMe<sup className="text-xs">®</sup></p>
                    <p className="text-sm text-white/70 mb-6">Are You a Trainer?</p>
                    <div className="flex flex-col gap-3">
                      <a 
                        href="https://play.google.com/store/apps/details?id=com.instatrainme.trainer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-105"
                        data-testid="link-trainer-google-play"
                      >
                        <img src="https://instatrainme.com/googleplaydark.webp" alt="Get it on Google Play" className="h-10" />
                      </a>
                      <a 
                        href="https://apps.apple.com/us/app/instatrainme-trainer/id1554932565" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-105"
                        data-testid="link-trainer-app-store"
                      >
                        <img src="https://instatrainme.com/appstoreblack.webp" alt="Download on the App Store" className="h-10" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white text-white bg-white/10 backdrop-blur-sm font-semibold px-8 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/20"
            onClick={() => document.getElementById('partner')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to partner section"
            data-testid="button-become-partner"
          >
            <Briefcase className="w-5 h-5 mr-2" aria-hidden="true" />
            Partner With Us
          </Button>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: Target,
    title: "Find Perfect Match",
    description: "AI-powered trainer matching based on your goals, schedule, and preferences."
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Real-time workout tracking with detailed analytics and milestone celebrations."
  },
  {
    icon: DollarSign,
    title: "Save Money",
    description: "Up to 40% cheaper than traditional gyms with flexible pay-per-session pricing."
  }
];

function BenefitsSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
          data-testid="text-benefits-title"
        >
          Why InstaTrainMe<sup>&reg;</sup>?
        </h2>
        <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          Join thousands of fitness enthusiasts who have transformed their lives with personalized training.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className={`border-0 shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              data-testid={`card-benefit-${index}`}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: Dumbbell, name: "Personal Training" },
  { icon: Heart, name: "Yoga" },
  { icon: Target, name: "Boxing / Kickboxing" },
  { icon: Zap, name: "HIIT" },
  { icon: Users, name: "Bootcamp" },
  { icon: Calendar, name: "Circuit Training" },
  { icon: Heart, name: "Pilates" },
  { icon: Zap, name: "Interval Training" },
  { icon: TrendingUp, name: "Running" },
  { icon: Target, name: "Martial Arts" },
  { icon: Users, name: "Sports Instruction" },
  { icon: Heart, name: "Dance" },
  { icon: Calendar, name: "Cycling" },
  { icon: Dumbbell, name: "Barre" },
  { icon: Heart, name: "Tai Chi" },
];

function ServicesSection() {
  const { ref, isInView } = useInView();
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? services : services.slice(0, 8);

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
          data-testid="text-services-title"
        >
          Our Services
        </h2>
        <p className="text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
          Whatever your fitness goals, we have expert trainers ready to help you succeed.
        </p>
        <p className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-sm font-medium text-[#667eea]">
            <Zap className="w-4 h-4" />
            50+ Training Categories Available
          </span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayedServices.map((service, index) => (
            <div
              key={service.name}
              className={`group p-6 bg-card rounded-xl text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-border ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              data-testid={`card-service-${index}`}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 flex items-center justify-center group-hover:from-[#667eea] group-hover:to-[#764ba2] transition-all duration-300">
                <service.icon className="w-6 h-6 text-[#667eea] group-hover:text-white transition-colors" />
              </div>
              <p className="text-sm font-medium text-foreground">{service.name}</p>
            </div>
          ))}
        </div>
        {services.length > 8 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="rounded-full px-8"
              data-testid="button-show-more-services"
            >
              {showAll ? "Show Less" : `Show All ${services.length} Categories`}
              <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${showAll ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function AppShowcaseSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-app-title">
              Your Fitness Journey
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                Starts Here
              </span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Download InstaTrainMe<sup>&reg;</sup> and connect with certified trainers. Book sessions, track your progress, and transform your fitness routine with personalized guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://apps.apple.com/us/app/instatrainme/id6499338812" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on App Store" 
                  className="h-12"
                  data-testid="link-app-store"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.instatrainme.user" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-12"
                  data-testid="link-google-play"
                />
              </a>
            </div>
          </div>
          <div className={`relative transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 rounded-3xl blur-3xl" />
            <div className="relative">
              <img 
                src="/app-showcase.webp"
                alt="InstaTrainMe mobile app showing trainer search and booking features"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                loading="lazy"
                width="400"
                height="500"
                data-testid="img-app-showcase"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppFeaturesSection() {
  const { ref, isInView } = useInView();
  const features = [
    { 
      image: "/app-connect.webp", 
      title: "Manage Sessions", 
      description: "View and manage all your training sessions in one place"
    },
    { 
      image: "/app-onsite.webp", 
      title: "Live Tracking", 
      description: "Track your trainer's arrival with real-time location updates"
    },
    { 
      image: "/app-session.webp", 
      title: "Session Details", 
      description: "Review session information, payments, and join virtual trainings"
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 bg-muted/30 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4" data-testid="text-features-title">
          Powerful Features for Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2]">
            Fitness Success
          </span>
        </h2>
        <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          Everything you need to find, book, and manage your training sessions seamlessly.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mx-auto mb-6 max-w-[200px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 rounded-3xl blur-xl" />
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="relative w-full rounded-2xl shadow-lg"
                  loading="lazy"
                  width="200"
                  height="400"
                  data-testid={`img-feature-${index + 1}`}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerFormSection() {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { companyName: string; contactName: string; email: string; organizationType: string; message?: string }) => {
      return apiRequest("POST", "/api/partners", data);
    },
    onSuccess: () => {
      toast({
        title: "Partnership Inquiry Submitted",
        description: "Thank you for your interest! Our team will contact you within 2 business days.",
      });
      setCompanyName("");
      setContactName("");
      setEmail("");
      setOrganizationType("");
      setMessage("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email || !organizationType) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate({ companyName, contactName, email, organizationType, message: message || undefined });
  };

  return (
    <section id="partner" className="py-20 md:py-28 px-5 bg-muted/30">
      <div className="max-w-xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
          data-testid="text-partner-title"
        >
          Partner With InstaTrainMe<sup>&reg;</sup>
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Explore collaboration opportunities for corporate wellness, health plans, and strategic partnerships.
        </p>
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="B2B partnership inquiry form">
              <div className="relative">
                <Label htmlFor="partner-company" className="sr-only">Company/Organization Name</Label>
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="partner-company"
                  type="text"
                  placeholder="Company/Organization Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="pl-10"
                  aria-label="Company or organization name"
                  data-testid="input-partner-company"
                />
              </div>
              <div className="relative">
                <Label htmlFor="partner-contact" className="sr-only">Contact Name</Label>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="partner-contact"
                  type="text"
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="pl-10"
                  aria-label="Your name"
                  data-testid="input-partner-contact"
                />
              </div>
              <div className="relative">
                <Label htmlFor="partner-email" className="sr-only">Work Email</Label>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  aria-label="Work email address"
                  data-testid="input-partner-email"
                />
              </div>
              <div>
                <Label htmlFor="partner-type" className="sr-only">Organization Type</Label>
                <Select value={organizationType} onValueChange={setOrganizationType}>
                  <SelectTrigger id="partner-type" aria-label="Select organization type" data-testid="select-partner-type">
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate-wellness">Corporate Wellness</SelectItem>
                    <SelectItem value="health-insurance">Health Insurance</SelectItem>
                    <SelectItem value="gym-chain">Gym / Fitness Chain</SelectItem>
                    <SelectItem value="hospitality">Hospitality / Hotels</SelectItem>
                    <SelectItem value="residential">Residential Communities</SelectItem>
                    <SelectItem value="strategic-alliance">Strategic Alliance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="partner-message" className="sr-only">Message (Optional)</Label>
                <textarea
                  id="partner-message"
                  placeholder="Tell us about your collaboration goals (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-h-[100px] px-4 py-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  aria-label="Message about collaboration goals"
                  data-testid="input-partner-message"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl"
                disabled={mutation.isPending}
                aria-label="Submit partnership inquiry"
                data-testid="button-partner-submit"
              >
                {mutation.isPending ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function GymFormSection() {
  const { toast } = useToast();
  const [gymName, setGymName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { gymName: string; location: string; email: string }) => {
      return apiRequest("POST", "/api/gyms", data);
    },
    onSuccess: () => {
      toast({
        title: "Gym Listed",
        description: "Thank you for listing your gym! We'll review and contact you soon.",
      });
      setGymName("");
      setLocation("");
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gymName || !location || !email) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate({ gymName, location, email });
  };

  return (
    <section className="py-20 md:py-28 px-5 bg-background">
      <div className="max-w-xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
          data-testid="text-gym-title"
        >
          List Your Gym
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Expand your reach and attract new members through our platform.
        </p>
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Gym listing form">
              <div className="relative">
                <Label htmlFor="gym-name" className="sr-only">Gym Name</Label>
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="gym-name"
                  type="text"
                  placeholder="Gym Name"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  className="pl-10"
                  aria-label="Gym name"
                  data-testid="input-gym-name"
                />
              </div>
              <div className="relative">
                <Label htmlFor="gym-location" className="sr-only">Location</Label>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="gym-location"
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                  aria-label="Gym location"
                  data-testid="input-gym-location"
                />
              </div>
              <div className="relative">
                <Label htmlFor="gym-email" className="sr-only">Email Address</Label>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="gym-email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  aria-label="Email address"
                  data-testid="input-gym-email"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl"
                disabled={mutation.isPending}
                aria-label="Submit gym listing"
                data-testid="button-gym-submit"
              >
                {mutation.isPending ? "Submitting..." : "List Gym"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Stay Motivated on Your Fitness Journey",
    excerpt: "Struggling to maintain your routine? Try these proven strategies to keep your momentum going.",
    category: "Motivation"
  },
  {
    id: 2,
    title: "Best Personal Training Apps of 2025",
    excerpt: "We tested the top fitness apps to help you find the perfect match for your goals.",
    category: "Technology"
  },
  {
    id: 3,
    title: "The Science Behind HIIT Training",
    excerpt: "Discover why high-intensity interval training is so effective for fat loss and endurance.",
    category: "Training"
  }
];

function BlogSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
          data-testid="text-blog-title"
        >
          Latest Tips & News
        </h2>
        <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          Stay updated with the latest fitness trends, tips, and expert advice.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`border-0 shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer group ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              data-testid={`card-blog-${post.id}`}
            >
              <CardContent className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea] mb-4">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[#667eea] transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link href="/blog" className="inline-flex items-center text-sm font-medium text-[#667eea] group-hover:gap-2 transition-all">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      return apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate({ email });
  };

  return (
    <section className="py-20 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-newsletter-title">
          Stay Updated
        </h2>
        <p className="text-white/80 mb-8">
          Subscribe to our newsletter for exclusive fitness tips, special offers, and the latest updates.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Newsletter subscription form">
          <Label htmlFor="newsletter-email" className="sr-only">Email Address</Label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 sm:w-80"
            aria-label="Email address for newsletter"
            data-testid="input-newsletter-email"
          />
          <Button 
            type="submit" 
            className="bg-white text-[#667eea] font-semibold hover:bg-white/90"
            disabled={mutation.isPending}
            aria-label="Subscribe to newsletter"
            data-testid="button-newsletter-submit"
          >
            {mutation.isPending ? "..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-white py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4 text-white">
              InstaTrainMe<span className="text-xl align-super text-[#667eea]">®</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Empowering individuals to unlock their full potential. Our fitness platform connects you with certified trainers for personalized guidance on your transformation journey.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/insta_train_me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#667eea] transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/instatrainme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#667eea] transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/InstaTrainMe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#667eea] transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sitemap</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="https://instatrainme.com/aboutus" className="hover:text-[#667eea] transition-colors">About Us</a></li>
              <li><a href="https://instatrainme.com/privacypolicy" className="hover:text-[#667eea] transition-colors">Privacy Policy</a></li>
              <li><a href="https://instatrainme.com/termsandconditions" className="hover:text-[#667eea] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a 
                  href="https://support.instatrainme.com/support/home" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#667eea] transition-colors flex items-center gap-2"
                  data-testid="link-support"
                >
                  <HelpCircle className="w-4 h-4" aria-hidden="true" />
                  Support Center
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#667eea] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-[#667eea] transition-colors" data-testid="link-partners">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>901 N Market St<br />Suite 100<br />Wilmington, DE 19801</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@instatrainme.com" className="hover:text-[#667eea] transition-colors">
                  support@instatrainme.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-gray-300 text-sm">&copy; {new Date().getFullYear()} InstaTrainMe<span className="text-[#667eea] font-bold">®</span> Technologies Inc. All rights reserved.</p>
          <img 
            src="/hipaa-compliant.png" 
            alt="HIPAA Compliant" 
            className="h-14 object-contain"
            data-testid="img-hipaa-badge"
          />
        </div>
      </div>
    </footer>
  );
}

function SocialShareButtons() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      <a
        href="https://twitter.com/share?url=https://instatrainme.com&text=Check out InstaTrainMe - Find Personal Trainers Near You!"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#667eea] hover:text-white transition-all group"
        data-testid="button-share-twitter"
      >
        <Twitter className="w-4 h-4 text-[#667eea] group-hover:text-white" />
      </a>
      <a
        href="https://wa.me/?text=Check out InstaTrainMe - Find Personal Trainers Near You! https://instatrainme.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all group"
        data-testid="button-share-whatsapp"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SocialShareButtons />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <AppShowcaseSection />
      <AppFeaturesSection />
      <PartnerFormSection />
      <GymFormSection />
      <BlogSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
