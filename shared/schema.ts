import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const partnerSubmissions = pgTable("partner_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  organizationType: text("organization_type").notNull(),
  message: text("message"),
});

export const insertPartnerSchema = createInsertSchema(partnerSubmissions).omit({
  id: true,
});

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partnerSubmissions.$inferSelect;

export const gymSubmissions = pgTable("gym_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gymName: text("gym_name").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
});

export const insertGymSchema = createInsertSchema(gymSubmissions).omit({
  id: true,
});

export type InsertGym = z.infer<typeof insertGymSchema>;
export type Gym = typeof gymSubmissions.$inferSelect;

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletterSubscriptions.$inferSelect;
