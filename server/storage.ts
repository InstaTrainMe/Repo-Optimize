import { 
  type User, type UpsertUser,
  type Partner, type InsertPartner,
  type Gym, type InsertGym,
  type Newsletter, type InsertNewsletter,
  type BlogPost, type InsertBlogPost,
  users, partnerSubmissions, gymSubmissions, newsletterSubscriptions, blogPosts
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  createUser(user: { email: string; firstName?: string; lastName?: string; isAdmin?: boolean }): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserAdmin(id: string, isAdmin: boolean): Promise<User | undefined>;
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

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createUser(userData: { email: string; firstName?: string; lastName?: string; isAdmin?: boolean }): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        email: userData.email,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        isAdmin: userData.isAdmin || false,
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async updateUserAdmin(id: string, isAdmin: boolean): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ isAdmin, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const [partner] = await db.insert(partnerSubmissions).values(insertPartner).returning();
    return partner;
  }

  async getPartners(): Promise<Partner[]> {
    return db.select().from(partnerSubmissions);
  }

  async createGym(insertGym: InsertGym): Promise<Gym> {
    const [gym] = await db.insert(gymSubmissions).values(insertGym).returning();
    return gym;
  }

  async getGyms(): Promise<Gym[]> {
    return db.select().from(gymSubmissions);
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db.insert(newsletterSubscriptions).values(insertNewsletter).returning();
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return newsletter;
  }

  async getBlogPosts(publishedOnly: boolean = false): Promise<BlogPost[]> {
    const posts = await db.select().from(blogPosts);
    const filtered = publishedOnly ? posts.filter((p: BlogPost) => p.published) : posts;
    return filtered.sort((a: BlogPost, b: BlogPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id)).returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
