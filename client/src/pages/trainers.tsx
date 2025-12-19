import { useCanonical } from "@/hooks/useCanonical";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Trainers() {
  useCanonical("/trainers");
  
  const categories = [
    "Personal Training",
    "Yoga",
    "Boxing/Kickboxing",
    "HIIT",
    "Bootcamp",
    "Circuit Training",
    "Pilates",
    "Interval Training",
    "Running",
    "Martial Arts",
    "Sports Instruction",
    "Dance",
    "Cycling",
    "Barre",
    "Tai Chi",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-20 px-5 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Find Your Perfect Trainer</h1>
          <p className="text-xl opacity-90">
            Browse our network of certified fitness professionals ready to help you reach your goals
          </p>
        </div>
      </section>

      <section className="py-16 px-5 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Trainers</h2>
            <div className="space-y-4">
              {[
                { title: "Verified & Certified", desc: "All trainers are thoroughly vetted with proven credentials" },
                { title: "50+ Categories", desc: "From personal training to dance and martial arts" },
                { title: "Flexible Scheduling", desc: "Book on-demand sessions or schedule ahead" },
                { title: "Real Results", desc: "Join 50K+ completed sessions and transform your fitness" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-[#667eea] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 rounded-lg p-8 flex flex-col justify-center">
            <Users className="w-16 h-16 text-[#667eea] mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Download InstaTrainMe® and start browsing trainers in your area. Find the perfect match for your fitness goals.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Training Categories Available</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {categories.map((cat, i) => (
              <Badge key={i} variant="secondary" className="py-2 px-4 text-center justify-center">
                {cat}
              </Badge>
            ))}
          </div>
          <Badge className="mx-auto block w-fit bg-[#667eea] text-white">50+ Training Categories Available</Badge>
        </div>
      </section>

      <section className="py-16 px-5 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, title: "Download", desc: "Get InstaTrainMe® on your device" },
              { num: 2, title: "Browse", desc: "Explore certified trainers in your area" },
              { num: 3, title: "Select", desc: "Choose your trainer and session type" },
              { num: 4, title: "Transform", desc: "Start your fitness journey today" }
            ].map((step, i) => (
              <Card key={i}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#667eea] text-white flex items-center justify-center font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Trainer Network</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Are you a certified fitness professional? Join thousands of trainers earning income through InstaTrainMe®.
        </p>
        <Link href="/">
          <Button variant="outline" size="lg">
            Learn About Partnership
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
