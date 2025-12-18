import { useLocation } from "wouter";
import { useCanonical } from "@/hooks/useCanonical";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { 
  Search, 
  Calendar, 
  Target, 
  CreditCard, 
  MessageSquare, 
  RefreshCw,
  Download,
  Users,
  Play,
  CheckCircle,
  Award,
  Dumbbell,
  Video,
  Bell,
  Heart,
  Layers
} from "lucide-react";

function SEOHead() {
  return (
    <>
      <title>About Us - InstaTrainMe® | Connect with Certified Trainers</title>
      <meta name="description" content="Learn about InstaTrainMe® - the fitness marketplace that instantly connects you with certified personal trainers, yoga instructors, and sports coaches." />
    </>
  );
}

const features = [
  {
    icon: Search,
    title: "Find Experts Instantly",
    description: "Discover certified trainers, coaches, and wellness professionals in your area with just a few taps."
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book sessions on-demand for immediate training or schedule at your convenience."
  },
  {
    icon: Target,
    title: "Perfect Match",
    description: "Filter by skills, location, and specialization to find your ideal trainer."
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Seamless and secure payment integration for hassle-free transactions."
  },
  {
    icon: MessageSquare,
    title: "Safe Communication",
    description: "Communicate with your trainer through secure in-session chat."
  },
  {
    icon: RefreshCw,
    title: "Easy Rebooking",
    description: "Easily rebook repeat sessions with your favorite trainers."
  }
];

const howItWorks = [
  {
    step: 1,
    icon: Download,
    title: "Download the App",
    description: "Get InstaTrainMe® from the App Store or Google Play and create your profile."
  },
  {
    step: 2,
    icon: Users,
    title: "Find Your Trainer",
    description: "Browse certified professionals and filter by skills, location, and availability."
  },
  {
    step: 3,
    icon: Calendar,
    title: "Book a Session",
    description: "Choose on-demand or scheduled sessions that fit your lifestyle."
  },
  {
    step: 4,
    icon: Play,
    title: "Start Training",
    description: "Connect with your trainer for virtual or onsite sessions and achieve your goals!"
  }
];

const benefits = [
  {
    icon: Award,
    title: "Access to Certified Professionals",
    description: "All trainers are verified and certified in their specializations."
  },
  {
    icon: Dumbbell,
    title: "Personalized Training Plans",
    description: "Get customized workout and coaching plans tailored to your goals."
  },
  {
    icon: Video,
    title: "Virtual or Onsite Options",
    description: "Train from home or meet in person - your choice!"
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description: "Stay updated with instant booking confirmations and reminders."
  },
  {
    icon: Heart,
    title: "Community Support",
    description: "Join an engaging fitness community to stay motivated."
  },
  {
    icon: Layers,
    title: "Diverse Specializations",
    description: "From yoga to sports coaching to personal training - find it all."
  }
];

export default function About() {
  useCanonical("/about");
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">
            Connect with Certified Trainers Instantly
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            InstaTrainMe® instantly connects you with certified fitness professionals. Whether you're seeking a personal trainer, yoga instructor, or sports coach, get on-demand access to top trainers nearby.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-[#667eea]"
              onClick={() => window.open("https://apps.apple.com/us/app/instatrainme/id6499338812", "_blank")}
              data-testid="button-app-store"
            >
              Download on App Store
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white bg-white/10 backdrop-blur-sm"
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.instatrainme.user", "_blank")}
              data-testid="button-google-play"
            >
              Get it on Google Play
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose InstaTrainMe Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4" data-testid="text-why-choose">
            Why Choose InstaTrainMe®?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the future of fitness with our innovative platform
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-[#667eea]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-5 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4" data-testid="text-how-it-works">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Get started in just four simple steps
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center" data-testid={`step-${step.step}`}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#667eea]/30 to-transparent" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transform Your Fitness Journey Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4" data-testid="text-transform">
            Transform Your Fitness Journey
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to achieve your fitness goals
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4" data-testid={`benefit-${index}`}>
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users already achieving their fitness goals with InstaTrainMe®
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#667eea]"
            onClick={() => setLocation("/")}
            data-testid="button-get-started"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
