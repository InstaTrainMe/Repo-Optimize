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
import { Target, TrendingUp, DollarSign, Download, Users, Calendar, Dumbbell, Heart, Zap, MapPin, Mail, Building2, User, ChevronRight, Twitter, MessageCircle, Moon, Sun, Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";

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
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 py-20 overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <ThemeToggle />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in"
          data-testid="text-hero-title"
        >
          Transform Your
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Fitness Journey
          </span>
        </h1>
        <p 
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          Connect with certified trainers and gyms instantly. Book on-demand sessions, track your progress, and achieve your fitness goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="bg-white text-[#667eea] font-semibold px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
            aria-label="Download the InstaTrainMe app"
            data-testid="button-download-app"
          >
            <Download className="w-5 h-5 mr-2" aria-hidden="true" />
            Download App
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white text-white bg-white/10 backdrop-blur-sm font-semibold px-8 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/20"
            onClick={() => document.getElementById('partner')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to partner registration section"
            data-testid="button-become-partner"
          >
            <Users className="w-5 h-5 mr-2" aria-hidden="true" />
            Become a Partner
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse" />
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
          Why InstaTrainMe?
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
  { icon: Zap, name: "HIIT" },
  { icon: Target, name: "Boxing / Kickboxing" },
  { icon: TrendingUp, name: "Cardio Strength" },
  { icon: Calendar, name: "Interval Training" }
];

function ServicesSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
          data-testid="text-services-title"
        >
          Our Services
        </h2>
        <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          Whatever your fitness goals, we have expert trainers ready to help you succeed.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`group p-6 bg-card rounded-xl text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-border ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
              data-testid={`card-service-${index}`}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 flex items-center justify-center group-hover:from-[#667eea] group-hover:to-[#764ba2] transition-all duration-300">
                <service.icon className="w-6 h-6 text-[#667eea] group-hover:text-white transition-colors" />
              </div>
              <p className="text-sm font-medium text-foreground">{service.name}</p>
            </div>
          ))}
        </div>
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
              Download InstaTrainMe and connect with certified trainers. Book sessions, track your progress, and transform your fitness routine with personalized guidance.
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
            <div className="relative bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-3xl p-8 shadow-2xl">
              <div className="bg-background rounded-2xl p-4 shadow-inner">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2]" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Personal Trainer</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-foreground">HIIT Session</span>
                    <span className="text-xs text-[#667eea] font-medium">Today, 3PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-foreground">Strength Training</span>
                    <span className="text-xs text-muted-foreground">Tomorrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerFormSection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; type: string }) => {
      return apiRequest("POST", "/api/partners", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest! We'll be in touch soon.",
      });
      setName("");
      setEmail("");
      setType("");
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
    if (!name || !email || !type) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate({ name, email, type });
  };

  return (
    <section id="partner" className="py-20 md:py-28 px-5 bg-muted/30">
      <div className="max-w-xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
          data-testid="text-partner-title"
        >
          Partner With Us
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Join our network of certified fitness professionals and grow your client base.
        </p>
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Partner registration form">
              <div className="relative">
                <Label htmlFor="partner-name" className="sr-only">Your Name</Label>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="partner-name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  aria-label="Your name"
                  data-testid="input-partner-name"
                />
              </div>
              <div className="relative">
                <Label htmlFor="partner-email" className="sr-only">Email Address</Label>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  aria-label="Email address"
                  data-testid="input-partner-email"
                />
              </div>
              <div>
                <Label htmlFor="partner-type" className="sr-only">Specialty</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="partner-type" aria-label="Select your specialty" data-testid="select-partner-type">
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal-trainer">Personal Trainer</SelectItem>
                    <SelectItem value="yoga-instructor">Yoga Instructor</SelectItem>
                    <SelectItem value="nutritionist">Nutritionist</SelectItem>
                    <SelectItem value="boxing-coach">Boxing / Kickboxing Coach</SelectItem>
                    <SelectItem value="hiit-specialist">HIIT Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl"
                disabled={mutation.isPending}
                aria-label="Submit partner application"
                data-testid="button-partner-submit"
              >
                {mutation.isPending ? "Submitting..." : "Join Now"}
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
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#667eea] to-[#764ba2]">
              InstaTrainMe
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
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>74 E Glenwood Ave Suite 252, Smyrna, DE 19977</span>
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
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} InstaTrainMe Technologies Inc. All rights reserved.</p>
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
      <SocialShareButtons />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <AppShowcaseSection />
      <PartnerFormSection />
      <GymFormSection />
      <BlogSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
