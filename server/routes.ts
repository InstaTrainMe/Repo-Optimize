import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPartnerSchema, insertGymSchema, insertNewsletterSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated, isAdmin, seedAdminUser } from "./auth";
import { sendPartnerNotification, sendGymNotification, sendNewsletterNotification } from "./email";
import { generateSlug } from "./utils";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  await setupAuth(app);
  await seedAdminUser();

  // Migrate existing blog posts to generate slugs
  app.post("/api/migrate-blog-slugs", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(false);
      let updated = 0;
      for (const post of posts) {
        if (!post.slug) {
          const slug = generateSlug(post.title);
          await storage.updateBlogPost(post.id, { slug });
          updated++;
        }
      }
      res.json({ message: `Updated ${updated} posts with slugs` });
    } catch (error) {
      res.status(500).json({ error: "Migration failed" });
    }
  });

  // Handle 301 redirects for legacy URLs
  app.get(["/aboutus", "/about-us"], (req, res) => res.redirect(301, "/about"));
  app.get(["/newsletter1", "/subscribe"], (req, res) => res.redirect(301, "/"));
  app.get(["/howitworks", "/how-it-works"], (req, res) => res.redirect(301, "/benefits"));
  app.get(["/contactus", "/contact-us"], (req, res) => res.redirect(301, "/"));
  app.get(["/privacypolicy", "/privacy-policy"], (req, res) => res.redirect(301, "/privacy"));
  app.get(["/termsandconditions", "/terms-and-conditions"], (req, res) => res.redirect(301, "/terms"));
  
  // Specific trainer redirects for geographic regions identified in Soft 404 report
  app.get("/trainers/wy", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ne", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/nd", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/nm", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ar", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/me", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ak", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ky", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ut", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ks", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/fl", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/tx", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ia", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/co", (req, res) => res.redirect(301, "/trainers"));
  2→  app.get("/trainers/hi", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ga", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ok", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/wi", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/in", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/sd", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/mn", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/tx/houston", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ca/san-diego", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/ca/los-angeles", (req, res) => res.redirect(301, "/trainers"));
  app.get("/trainers/fl/fort-lauderdale", (req, res) => res.redirect(301, "/trainers"));
  
  // Other legacy redirects from GSC report
  app.get("/services", (req, res) => res.redirect(301, "/benefits"));
  app.get("/terms-of-service", (req, res) => res.redirect(301, "/terms"));
  app.get("/waitlistsignup", (req, res) => res.redirect(301, "/"));

  // Dynamic sitemap.xml generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = "https://www.instatrainme.com";
      const today = new Date().toISOString().split('T')[0];
      
      // Static pages
      const staticPages = [
        { loc: "/", priority: "1.0", changefreq: "weekly" },
        { loc: "/about", priority: "0.8", changefreq: "monthly" },
        { loc: "/benefits", priority: "0.8", changefreq: "monthly" },
        { loc: "/faq", priority: "0.7", changefreq: "monthly" },
        { loc: "/blog", priority: "0.9", changefreq: "daily" },
        { loc: "/partners", priority: "0.6", changefreq: "monthly" },
        { loc: "/privacy", priority: "0.5", changefreq: "yearly" },
        { loc: "/terms", priority: "0.5", changefreq: "yearly" },
      ];

      // Fetch published blog posts
      const blogPosts = await storage.getBlogPosts(true);
      
      // Build XML
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
      
      // Add static pages
      for (const page of staticPages) {
        xml += `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
      }
      
      // Add blog posts (only use slug-based URLs to avoid duplicates)
      for (const post of blogPosts) {
        const postDate = new Date(post.createdAt).toISOString().split('T')[0];
        // Only include slug-based URLs to avoid duplicate content issues
        if (post.slug) {
          const postUrl = `/blog/${post.slug}`;
          xml += `  <url>
    <loc>${baseUrl}${postUrl}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
        }
      }
      
      xml += `</urlset>`;
      
      res.set("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get('/api/admin/users', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch('/api/admin/users/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { isAdmin } = req.body;
      const user = await storage.updateUserAdmin(req.params.id, isAdmin);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post('/api/admin/users', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { email, firstName, lastName, isAdmin } = req.body;
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }
      const user = await storage.createUser({ email, firstName, lastName, isAdmin });
      res.status(201).json(user);
    } catch (error: any) {
      if (error?.code === '23505') {
        res.status(400).json({ error: "A user with this email already exists" });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.post("/api/partners", async (req, res) => {
    try {
      const validatedData = insertPartnerSchema.parse(req.body);
      const partner = await storage.createPartner(validatedData);
      sendPartnerNotification(validatedData).catch(console.error);
      res.status(201).json(partner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/gyms", async (req, res) => {
    try {
      const validatedData = insertGymSchema.parse(req.body);
      const gym = await storage.createGym(validatedData);
      sendGymNotification(validatedData).catch(console.error);
      res.status(201).json(gym);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/gyms", async (req, res) => {
    try {
      const gyms = await storage.getGyms();
      res.json(gyms);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      const existing = await storage.getNewsletterByEmail(validatedData.email);
      if (existing) {
        res.status(400).json({ error: "Email already subscribed" });
        return;
      }
      
      const newsletter = await storage.createNewsletter(validatedData);
      sendNewsletterNotification(validatedData.email).catch(console.error);
      res.status(201).json(newsletter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const publishedOnly = req.query.published === "true";
      const posts = await storage.getBlogPosts(publishedOnly);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/blog/slug/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/blog", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.patch("/api/blog/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const updates = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, updates);
      if (!post) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.delete("/api/blog/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
