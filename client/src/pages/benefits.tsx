import { useCanonical } from "@/hooks/useCanonical";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Navigation } from "@/components/navigation";
import { 
  Shield, 
  Target, 
  Clock, 
  Home, 
  DollarSign, 
  BarChart3, 
  Lock, 
  Users, 
  Star,
  Check,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Heart
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Certified Professionals Only",
    description: "Every trainer on InstaTrainMe® is verified and certified in their specialization. We thoroughly vet credentials to ensure you're working with qualified fitness experts.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Personalized Training Plans",
    description: "Get customized workout and nutrition plans tailored to your specific goals, fitness level, and preferences. Your trainer designs programs that adapt as you progress.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Clock,
    title: "Ultimate Flexibility",
    description: "Train on your schedule with on-demand sessions or book ahead. Whether it's early morning or late night, find trainers available when you are.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Home,
    title: "Train Anywhere",
    description: "Choose virtual sessions from home or onsite training at your preferred location. The flexibility to train where you're most comfortable.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: DollarSign,
    title: "Cost-Effective Training",
    description: "Access professional training at competitive rates. Pay only for sessions you use without expensive gym memberships or long-term contracts.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description: "Monitor your fitness journey with built-in tracking tools. See your improvements over time and stay motivated with measurable results.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your data and communications are protected with enterprise-grade security. Safe payment processing and private messaging ensure your information stays secure.",
    color: "from-slate-500 to-gray-600"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a vibrant fitness community. Share experiences, get motivated, and connect with others on similar fitness journeys.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Make informed decisions with authentic reviews from real users. See ratings and feedback before booking your trainer.",
    color: "from-amber-500 to-yellow-500"
  }
];

const stats = [
  { value: "10K+", label: "Active Users", icon: Users },
  { value: "500+", label: "Certified Trainers", icon: Award },
  { value: "50K+", label: "Sessions Completed", icon: TrendingUp },
  { value: "4.8", label: "Average Rating", icon: Star, suffix: "★" }
];

const comparisonFeatures = [
  { feature: "Certified Trainers", instatrainme: true, traditionalGym: true },
  { feature: "Flexible Scheduling", instatrainme: true, traditionalGym: false },
  { feature: "Train Anywhere", instatrainme: true, traditionalGym: false },
  { feature: "No Long-Term Contracts", instatrainme: true, traditionalGym: false },
  { feature: "Personalized Plans", instatrainme: true, traditionalGym: false },
  { feature: "Pay Per Session", instatrainme: true, traditionalGym: false },
  { feature: "Verified Reviews", instatrainme: true, traditionalGym: false }
];

function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 px-5 overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
          <Sparkles className="w-3 h-3 mr-1" />
          Why Choose Us
        </Badge>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-benefits-title">
          Why Choose InstaTrainMe<span className="text-yellow-300">®</span>?
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10" data-testid="text-benefits-subtitle">
          Discover the advantages of training with certified professionals through our innovative fitness platform
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-white text-[#667eea] hover:bg-white/90 font-semibold text-lg px-8"
                data-testid="button-get-started"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
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
                        className="transition-transform hover:scale-105"
                        aria-label="Download InstaTrainMe fitness app on Google Play Store"
                        title="Download InstaTrainMe - Personal Trainer App for Android"
                      >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
                      </a>
                      <a 
                        href="https://apps.apple.com/us/app/instatrainme/id6499338812" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-105"
                        aria-label="Download InstaTrainMe fitness app on Apple App Store"
                        title="Download InstaTrainMe - Personal Trainer App for iOS"
                      >
                        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on App Store" className="h-12" />
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
                        className="transition-transform hover:scale-105"
                        aria-label="Download InstaTrainMe Trainer app on Google Play Store"
                        title="Download InstaTrainMe Trainer - Manage Fitness Clients for Android"
                      >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
                      </a>
                      <a 
                        href="https://apps.apple.com/us/app/instatrainme-trainer/id6499338940" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-105"
                        aria-label="Download InstaTrainMe Trainer app on Apple App Store"
                        title="Download InstaTrainMe Trainer - Manage Fitness Clients for iOS"
                      >
                        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on App Store" className="h-12" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Link href="/">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/50 text-white hover:bg-white/10 font-semibold text-lg px-8 bg-white/10 backdrop-blur-sm"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BenefitsGrid() {
  return (
    <section className="py-20 px-5 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Heart className="w-3 h-3 mr-1" />
            Platform Benefits
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-benefits-grid-title">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed to make your fitness journey as smooth and effective as possible
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover-elevate border-border/50 transition-all duration-300"
              data-testid={`card-benefit-${index}`}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-20 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-impact-title">
            Our Impact
          </h2>
          <p className="text-white/80 text-lg">Real numbers from real users</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-center"
              data-testid={`card-stat-${index}`}
            >
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-white/80 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}{stat.suffix && <span className="text-yellow-300">{stat.suffix}</span>}
                </div>
                <p className="text-white/80">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="py-20 px-5 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <TrendingUp className="w-3 h-3 mr-1" />
            Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-comparison-title">
            InstaTrainMe® vs Traditional Gyms
          </h2>
          <p className="text-muted-foreground">See how we stack up against traditional options</p>
        </div>
        
        <Card className="overflow-hidden" data-testid="table-comparison">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">InstaTrainMe®</th>
                  <th className="text-center p-4 font-semibold">Traditional Gym</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}
                  >
                    <td className="p-4 font-medium">{item.feature}</td>
                    <td className="p-4 text-center">
                      {item.instatrainme ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30">
                          <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {item.traditionalGym ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30">
                          <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-5 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 rounded-3xl blur-2xl"></div>
          <Card className="relative border-2 border-[#667eea]/30 bg-card/80 backdrop-blur-sm" data-testid="card-cta">
            <CardContent className="p-10">
              <Sparkles className="w-12 h-12 text-[#667eea] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
                Experience the Benefits Today
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands already transforming their fitness with InstaTrainMe®
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:opacity-90 font-semibold text-lg px-8"
                      data-testid="button-cta-get-started"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
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
                              className="transition-transform hover:scale-105"
                              aria-label="Download InstaTrainMe fitness app on Google Play Store"
                              title="Download InstaTrainMe - Personal Trainer App for Android"
                            >
                              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
                            </a>
                            <a 
                              href="https://apps.apple.com/us/app/instatrainme/id6499338812" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="transition-transform hover:scale-105"
                              aria-label="Download InstaTrainMe fitness app on Apple App Store"
                              title="Download InstaTrainMe - Personal Trainer App for iOS"
                            >
                              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on App Store" className="h-12" />
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
                              className="transition-transform hover:scale-105"
                              aria-label="Download InstaTrainMe Trainer app on Google Play Store"
                              title="Download InstaTrainMe Trainer - Manage Fitness Clients for Android"
                            >
                              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
                            </a>
                            <a 
                              href="https://apps.apple.com/us/app/instatrainme-trainer/id6499338940" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="transition-transform hover:scale-105"
                              aria-label="Download InstaTrainMe Trainer app on Apple App Store"
                              title="Download InstaTrainMe Trainer - Manage Fitness Clients for iOS"
                            >
                              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on App Store" className="h-12" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Link href="/">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="font-semibold text-lg px-8"
                    data-testid="button-cta-home"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function Benefits() {
  useCanonical("/benefits");
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <BenefitsGrid />
      <ImpactSection />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}
