import { 
  type User, type InsertUser,
  type Partner, type InsertPartner,
  type Gym, type InsertGym,
  type Newsletter, type InsertNewsletter,
  type BlogPost, type InsertBlogPost
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  getPartners(): Promise<Partner[]>;
  createGym(gym: InsertGym): Promise<Gym>;
  getGyms(): Promise<Gym[]>;
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private partners: Map<string, Partner>;
  private gyms: Map<string, Gym>;
  private newsletters: Map<string, Newsletter>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.partners = new Map();
    this.gyms = new Map();
    this.newsletters = new Map();
    this.blogPosts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const id = randomUUID();
    const partner: Partner = { 
      ...insertPartner, 
      id,
      message: insertPartner.message ?? null 
    };
    this.partners.set(id, partner);
    return partner;
  }

  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async createGym(insertGym: InsertGym): Promise<Gym> {
    const id = randomUUID();
    const gym: Gym = { ...insertGym, id };
    this.gyms.set(id, gym);
    return gym;
  }

  async getGyms(): Promise<Gym[]> {
    return Array.from(this.gyms.values());
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = { ...insertNewsletter, id };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (n) => n.email === email,
    );
  }

  async getBlogPosts(publishedOnly: boolean = false): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    const filtered = publishedOnly ? posts.filter(p => p.published) : posts;
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost, 
      id,
      createdAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    const updated: BlogPost = { ...existing, ...updates };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
