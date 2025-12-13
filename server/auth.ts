import session from "express-session";
import type { Express, RequestHandler, Request } from "express";
import connectPg from "connect-pg-simple";
import bcrypt from "bcrypt";
import { storage } from "./storage";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      isAdmin: boolean;
    };
  }
}

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || !user.passwordHash) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({ message: "Session error" });
        }
        
        req.session.user = {
          id: user.id,
          isAdmin: user.isAdmin || false,
        };
        
        req.session.save((err) => {
          if (err) {
            return res.status(500).json({ message: "Session save error" });
          }
          res.json({ 
            message: "Login successful",
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              isAdmin: user.isAdmin,
            }
          });
        });
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout error" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const user = await storage.getUser(req.session.user.id);
  if (!user?.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  
  next();
};

export async function seedAdminUser() {
  const existingUsers = await storage.getAllUsers();
  const hasAdminWithPassword = existingUsers.some(u => u.isAdmin && u.passwordHash);
  
  if (!hasAdminWithPassword) {
    const tempPassword = "Admin123!";
    const passwordHash = await bcrypt.hash(tempPassword, 10);
    
    const existingAdmin = existingUsers.find(u => u.email === "admin@instatrainme.com");
    if (existingAdmin) {
      await storage.updateUserPassword(existingAdmin.id, passwordHash);
      if (!existingAdmin.isAdmin) {
        await storage.updateUserAdmin(existingAdmin.id, true);
      }
      console.log("===========================================");
      console.log("TEMPORARY ADMIN CREDENTIALS:");
      console.log("Email: admin@instatrainme.com");
      console.log("Password: Admin123!");
      console.log("Please change this password after logging in!");
      console.log("===========================================");
    } else {
      await storage.createUserWithPassword({
        email: "admin@instatrainme.com",
        passwordHash,
        firstName: "Admin",
        lastName: "User",
        isAdmin: true,
      });
      console.log("===========================================");
      console.log("TEMPORARY ADMIN CREDENTIALS:");
      console.log("Email: admin@instatrainme.com");
      console.log("Password: Admin123!");
      console.log("Please change this password after logging in!");
      console.log("===========================================");
    }
  }
}
