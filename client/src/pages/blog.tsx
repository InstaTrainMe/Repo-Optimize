import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCanonical } from "@/hooks/useCanonical";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Moon, Sun, Settings } from "lucide-react";
import { ShareButtons } from "@/components/share-buttons";
import { useLocation } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import DOMPurify from "isomorphic-dompurify";
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

const defaultMeta = {
  title: "Blog - Fitness Tips & News | InstaTrainMe",
  description: "Stay updated with the latest fitness trends, workout tips, nutrition advice, and expert guidance from InstaTrainMe certified trainers.",
  ogTitle: "InstaTrainMe® - Find Certified Personal Trainers Near You",
  ogDescription: "Connect with certified trainers instantly. Book on-demand or scheduled sessions. Train anywhere - virtual or in-person. 500+ certified trainers, 50K+ sessions completed.",
  ogType: "website",
  ogUrl: "https://instatrainme.com",
  ogImage: "https://instatrainme.com/og-image.png",
  twitterTitle: "InstaTrainMe® - Find Certified Personal Trainers",
  twitterDescription: "Connect with certified trainers instantly. Book on-demand sessions. Train anywhere!",
  twitterCard: "summary_large_image",
  twitterImage: "https://instatrainme.com/og-image.png"
};

function SEOHead({ post }: { post?: DisplayPost }) {
  useEffect(() => {
    const setMeta = (selector: string, attr: string, content: string) => {
      const meta = document.querySelector(selector);
      if (meta) meta.setAttribute(attr, content);
    };

    if (post) {
      const postUrl = post.slug 
        ? `https://instatrainme.com/blog/${post.slug}`
        : `https://instatrainme.com/blog/${post.id}`;
      const postImage = "https://instatrainme.com/og-blog.png";
      
      document.title = `${post.title} | InstaTrainMe Blog`;
      setMeta('meta[name="description"]', "content", post.excerpt);
      setMeta('meta[property="og:title"]', "content", post.title);
      setMeta('meta[property="og:description"]', "content", post.excerpt);
      setMeta('meta[property="og:type"]', "content", "article");
      setMeta('meta[property="og:url"]', "content", postUrl);
      setMeta('meta[property="og:image"]', "content", postImage);
      setMeta('meta[name="twitter:title"]', "content", post.title);
      setMeta('meta[name="twitter:description"]', "content", post.excerpt);
      setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
      setMeta('meta[name="twitter:image"]', "content", postImage);

      const existingSchema = document.querySelector('script[data-schema="blog"]');
      if (existingSchema) existingSchema.remove();

      const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "url": postUrl,
        "author": { "@type": "Person", "name": post.author },
        "datePublished": new Date(post.createdAt).toISOString(),
        "publisher": { "@type": "Organization", "name": "InstaTrainMe", "url": "https://instatrainme.com" },
        "articleSection": post.category
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "blog");
      script.textContent = JSON.stringify(blogSchema);
      document.head.appendChild(script);
    } else {
      document.title = defaultMeta.title;
      setMeta('meta[name="description"]', "content", defaultMeta.description);
      setMeta('meta[property="og:title"]', "content", defaultMeta.ogTitle);
      setMeta('meta[property="og:description"]', "content", defaultMeta.ogDescription);
      setMeta('meta[property="og:type"]', "content", defaultMeta.ogType);
      setMeta('meta[property="og:url"]', "content", defaultMeta.ogUrl);
      setMeta('meta[property="og:image"]', "content", defaultMeta.ogImage);
      setMeta('meta[name="twitter:title"]', "content", defaultMeta.twitterTitle);
      setMeta('meta[name="twitter:description"]', "content", defaultMeta.twitterDescription);
      setMeta('meta[name="twitter:card"]', "content", defaultMeta.twitterCard);
      setMeta('meta[name="twitter:image"]', "content", defaultMeta.twitterImage);

      const schemaScript = document.querySelector('script[data-schema="blog"]');
      if (schemaScript) schemaScript.remove();
    }

    return () => {
      const schemaScript = document.querySelector('script[data-schema="blog"]');
      if (schemaScript) schemaScript.remove();
    };
  }, [post]);

  return null;
}

interface DisplayPost {
  id: string;
  title: string;
  slug?: string | null;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  imageUrl?: string | null;
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

function isHtmlContent(content: string): boolean {
  // Check for both regular HTML tags and HTML entity-encoded tags
  return /<[a-z][\s\S]*>/i.test(content) || /&lt;[a-z][\s\S]*&gt;/i.test(content);
}

function sanitizeHtml(html: string): string {
  // Decode HTML entities first if present
  const decoded = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
  return DOMPurify.sanitize(decoded, { 
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption', 'div', 'span'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'className', 'class', 'loading']
  });
}

export default function Blog() {
  useCanonical("/blog");
  const [, setLocation] = useLocation();
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
        <SEOHead post={selectedPost} />
        <Navigation />
        <div className="max-w-4xl mx-auto px-5 py-4">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPost(null)}
            aria-label="Go back to blog listing"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Blog
          </Button>
        </div>
        <main className="max-w-4xl mx-auto px-5 py-12">
          <article>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea] mb-6">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-article-title">
              {selectedPost.title}
            </h1>
            {selectedPost.imageUrl && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>
            )}
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
            <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
              {isHtmlContent(selectedPost.content) ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedPost.content) }}
                  className="text-foreground/80 leading-relaxed"
                  data-testid="html-content"
                />
              ) : (
                selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground/80 leading-relaxed mb-4 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))
              )}
            </div>
            <div className="mt-12 pt-8 border-t border-border">
              <ShareButtons title={selectedPost.title} />
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Navigation />
      <main className="max-w-6xl mx-auto px-5 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-blog-title">
              Fitness Tips & News
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Manage blog posts" 
              onClick={() => setLocation("/admin/blog")}
              data-testid="button-admin"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
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
              {post.imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
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
