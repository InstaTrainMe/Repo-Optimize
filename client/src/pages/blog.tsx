import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Moon, Sun, Settings } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import type { BlogPost } from "@shared/schema";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="button-theme-toggle"
      className="bg-muted"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}

function SEOHead() {
  useEffect(() => {
    document.title = "Blog - Fitness Tips & News | Instatrainme";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Stay updated with the latest fitness trends, workout tips, nutrition advice, and expert guidance from Instatrainme certified trainers.");
    }
  }, []);
  return null;
}

interface DisplayPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: Date | string;
}

const fallbackPosts: DisplayPost[] = [
  {
    id: "1",
    title: "5 Ways to Stay Motivated on Your Fitness Journey",
    excerpt: "Struggling to maintain your routine? Try these proven strategies to keep your momentum going throughout the year.",
    content: `Staying motivated on your fitness journey can be challenging, especially when life gets busy. Here are five proven strategies to help you maintain momentum:

1. **Set Clear, Achievable Goals**: Break down your larger fitness goals into smaller, manageable milestones. Celebrate each achievement to stay motivated.

2. **Find a Workout Buddy**: Having a partner keeps you accountable and makes workouts more enjoyable. Consider using Instatrainme to connect with like-minded fitness enthusiasts.

3. **Mix Up Your Routine**: Variety prevents boredom. Try different types of workouts - from HIIT to yoga to strength training.

4. **Track Your Progress**: Use apps to log your workouts and see how far you've come. Visual progress is incredibly motivating.

5. **Reward Yourself**: Set up a reward system for hitting your goals. Treat yourself to new workout gear or a relaxing massage.`,
    category: "Motivation",
    author: "Sarah Johnson",
    createdAt: "2025-12-10",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Best Personal Training Apps of 2025",
    excerpt: "We tested the top fitness apps to help you find the perfect match for your goals and lifestyle.",
    content: `The fitness app market has exploded in recent years. Here's our comprehensive review of the best personal training apps in 2025:

**Instatrainme** - Our Top Pick
Connect with certified trainers for real-time, personalized coaching. Perfect for those who want human guidance with app convenience.

**Key Features to Look For:**
- Real-time trainer matching
- Video call capabilities
- Progress tracking
- Flexible scheduling
- Secure payment processing

**Why Instatrainme Stands Out:**
Unlike fully automated apps, Instatrainme combines technology with real human expertise, giving you the best of both worlds.`,
    category: "Technology",
    author: "Mike Chen",
    createdAt: "2025-12-08",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "The Science Behind HIIT Training",
    excerpt: "Discover why high-intensity interval training is so effective for fat loss, endurance, and overall fitness.",
    content: `High-Intensity Interval Training (HIIT) has become one of the most popular workout methods. Here's the science behind why it works:

**What is HIIT?**
HIIT alternates between intense bursts of activity and fixed periods of less-intense activity or rest.

**The EPOC Effect**
After a HIIT workout, your body continues burning calories at an elevated rate for hours. This is called Excess Post-Exercise Oxygen Consumption (EPOC).

**Benefits of HIIT:**
- Burns more calories in less time
- Improves cardiovascular health
- Increases metabolism
- Builds muscle while burning fat
- Can be done anywhere with no equipment

**Getting Started:**
Start with 1-2 HIIT sessions per week and gradually increase. Consider working with a certified trainer through Instatrainme to ensure proper form and intensity.`,
    category: "Training",
    author: "Dr. Emily Roberts",
    createdAt: "2025-12-05",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Nutrition Tips for Optimal Performance",
    excerpt: "Fuel your workouts properly with these essential nutrition guidelines from certified nutritionists.",
    content: `Proper nutrition is just as important as your workout routine. Here are key tips to optimize your performance:

**Pre-Workout Nutrition:**
- Eat 2-3 hours before exercise
- Focus on carbs for energy
- Include moderate protein
- Stay hydrated

**Post-Workout Recovery:**
- Consume protein within 30 minutes
- Replenish glycogen with carbs
- Drink plenty of water
- Consider a recovery shake

**Daily Nutrition Habits:**
- Eat whole, unprocessed foods
- Include protein in every meal
- Don't skip breakfast
- Plan your meals ahead

Connect with a certified nutritionist through Instatrainme for personalized meal planning!`,
    category: "Nutrition",
    author: "Lisa Martinez",
    createdAt: "2025-12-01",
    readTime: "8 min read"
  }
];

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default function Blog() {
  const { data: dbPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", "published"],
    queryFn: async () => {
      const res = await fetch("/api/blog?published=true");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    }
  });

  const blogPosts: DisplayPost[] = dbPosts.length > 0 
    ? dbPosts.map(p => ({ ...p, createdAt: p.createdAt }))
    : fallbackPosts;

  const [selectedPost, setSelectedPost] = useState<DisplayPost | null>(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead />
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPost(null)}
              aria-label="Go back to blog listing"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Blog
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-5 py-12">
          <article>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea] mb-6">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-article-title">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {selectedPost.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedPost.createdAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedPost.readTime}
              </span>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed mb-4 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" aria-label="Go to homepage" data-testid="button-home">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Home
            </Button>
          </Link>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#667eea] to-[#764ba2]">
            Instatrainme Blog
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/admin/blog">
              <Button variant="ghost" size="icon" aria-label="Manage blog posts" data-testid="button-admin">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-blog-title">
            Fitness Tips & News
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert advice, training tips, and the latest updates from the fitness world.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              onClick={() => setSelectedPost(post)}
              data-testid={`card-blog-${post.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea]">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#667eea] transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="text-muted-foreground">{formatDate(post.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
