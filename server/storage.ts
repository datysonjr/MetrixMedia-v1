import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";
import { contactSubmissions, users } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  private getDb() {
    const { getDb } = require("./database");
    return getDb();
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const db = this.getDb();
      const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return result[0] || undefined;
    } catch (error) {
      console.error('Database error in getUser:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const db = this.getDb();
      const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
      return result[0] || undefined;
    } catch (error) {
      console.error('Database error in getUserByUsername:', error);
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const db = this.getDb();
      const id = randomUUID();
      const user: User = { ...insertUser, id };
      await db.insert(users).values(user);
      return user;
    } catch (error) {
      console.error('Database error in createUser:', error);
      throw error;
    }
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    try {
      const db = this.getDb();
      const id = randomUUID();
      const submissionData = {
        ...insertSubmission,
        id,
        company: insertSubmission.company || null,
        website: insertSubmission.website || null,
      };
      
      console.log('Inserting contact submission to database:', submissionData);
      const result = await db.insert(contactSubmissions).values(submissionData).returning();
      console.log('Successfully saved contact submission:', result[0]);
      return result[0];
    } catch (error) {
      console.error('Database error in createContactSubmission:', error);
      throw error;
    }
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      const db = this.getDb();
      return await db.select().from(contactSubmissions);
    } catch (error) {
      console.error('Database error in getContactSubmissions:', error);
      throw error;
    }
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
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

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      company: insertSubmission.company || null,
      website: insertSubmission.website || null,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

// Use DatabaseStorage when DATABASE_URL is available, MemStorage as fallback
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();

console.log(`Using ${process.env.DATABASE_URL ? 'DatabaseStorage (PostgreSQL)' : 'MemStorage (in-memory)'} for data persistence`);
