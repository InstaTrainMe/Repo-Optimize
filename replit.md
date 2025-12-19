# Instatrainme

## Overview

Instatrainme® is a fitness platform landing page that connects users with certified personal trainers and gyms. The application serves as a marketing website with B2B partnership forms (corporate wellness, health insurance, strategic partnerships), gym registration, newsletter subscription, database-driven blog section with admin interface for daily content management, and mobile app promotion. The platform offers apps for both Users and Trainers on Google Play and App Store.

## Recent Changes (December 2025)

- **Blog URL-Based Routing**: Fixed interlinking issue by implementing URL-based routing for individual blog posts. Each post now has a unique URL at `/blog/:slug` (e.g., `/blog/5-ways-to-stay-motivated`) enabling proper internal linking and SEO. Posts can be accessed by slug or ID as fallback. Canonical URLs properly set for each post.
- **Blog Slug Generation**: All blog posts automatically generate clean URL-friendly slugs from titles (3 existing posts migrated, new posts auto-generate). Slugs enable better readability and SEO compared to numeric IDs.
- **Admin Authentication**: Implemented Replit Auth-based admin authentication for blog management. Users must log in and have admin privileges to access `/admin/blog`. Admin users can manage other user's admin status.
- **Database-Driven Blog System**: Admin interface at `/admin/blog` for creating, editing, publishing, and deleting blog posts. Protected by authentication. Blog page fetches published posts from the database with fallback to sample content.
- **Freshworks Chatbot**: Integrated Freshworks chat widget for customer support.
- **HIPAA Compliant Badge**: Added HIPAA compliant badge to footer.
- **Footer Address Updated**: 901 N Market St, Suite 100, Wilmington, DE 19801.
- **Brand Update**: Changed all "InstaTrainMe" references to "InstaTrainMe®" (registered trademark)
- **Removed CrossFit**: Removed CrossFit from services list (now 15 categories)
- **B2B Partner Form**: Updated "Partner With Us" section to target enterprise partnerships (corporate wellness, health insurance, gym chains, hospitality, residential communities, strategic alliances) with company-focused fields
- **Get Started Dialog**: Modal with separate app download options for Users ("Start my Fitness Journey") and Trainers ("Provide Training with InstaTrainMe"), each with Google Play and App Store links
- **Our Services Section**: Expanded to 15 training categories (Personal Training, Yoga, Boxing/Kickboxing, HIIT, Bootcamp, Circuit Training, Pilates, Interval Training, Running, Martial Arts, Sports Instruction, Dance, Cycling, Barre, Tai Chi) with "50+ Training Categories Available" badge and show/hide toggle
- **Support Link**: Added Support Center link (https://support.instatrainme.com/support/home) to footer Resources section
- **Accessibility**: Added comprehensive aria-labels, keyboard navigation, and form labels for WCAG 2.1 AA compliance
- **PostgreSQL Database**: Created database for data persistence
- **About Us Page**: New /about page with Why Choose InstaTrainMe, How It Works (4 steps), and Transform Your Fitness Journey sections
- **FAQ Page**: New /faq page with 11 accordion-style Q&A items covering common questions about the platform
- **Site Navigation**: Updated navigation with Home, About, Benefits, FAQ, and Blog links
- **SEO Optimizations**: Share buttons on blog posts, Organization/WebSite/MobileApplication schema markup, FAQ schema, BlogPosting schema with dynamic social cards (og:image, twitter:image), speed optimizations (dns-prefetch, font optimization, canonical URL)
- **Partners Page**: New /partners page listing partner companies (FitTeam, Wellzy Perks) with external links. Added "Partners" link to footer Resources section
- **Privacy Policy Page**: New /privacy page with comprehensive privacy policy including data collection, usage, security, and HIPAA compliance information. InstaTrainMe® branding throughout.
- **Terms & Conditions Page**: New /terms page with comprehensive terms of service covering user agreements, liability, intellectual property, and dispute resolution. InstaTrainMe® branding throughout.
- **Footer Links Updated**: Sitemap section now uses internal routes (/about, /privacy, /terms) instead of external URLs
- **Dynamic Sitemap**: Dynamic /sitemap.xml endpoint that auto-generates XML with all static pages and published blog posts. Includes proper lastmod, changefreq, and priority values for SEO
- **Blog Post Images**: Added imageUrl field to blog posts. Admin can add image URLs when creating/editing posts. Images display on blog cards and article pages.
- **User Management**: Admin panel now includes ability to create new users with email, first name, last name, and admin status toggle.
- **Email Notifications**: Mailgun integration sends email notifications to Sales@instatrainme.com when forms are submitted (partnership inquiries, gym registrations, newsletter subscriptions). Requires MAILGUN_API_KEY and MAILGUN_DOMAIN secrets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Build Tool**: Vite with custom plugins for Replit integration
- **Theme System**: Custom ThemeProvider supporting light/dark modes with localStorage persistence

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ES modules)
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Validation**: Zod schemas with drizzle-zod integration for type-safe validation

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Current Tables**: users, partner_submissions (B2B with companyName, contactName, email, organizationType, message), gym_submissions, newsletter_subscriptions, blog_posts (title, slug, excerpt, content, category, author, readTime, imageUrl, published, createdAt)
- **Development Storage**: MemStorage class provides in-memory fallback when database unavailable

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (shadcn/ui library)
    pages/        # Route components (home, about, benefits, faq, blog, blog-admin, partners, privacy-policy, terms, not-found)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Data access layer
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schema
```

### Design System
- Uses gradient-heavy aesthetics inspired by Stripe/Linear
- Primary gradient: Purple (#667eea → #764ba2)
- Typography: Plus Jakarta Sans and Inter font families
- Component styling follows shadcn/ui conventions with CSS variables for theming

### Build Process
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Key dependencies are bundled to reduce cold start times

## External Dependencies

### Database
- PostgreSQL (configured via `DATABASE_URL` environment variable)
- Drizzle Kit for schema migrations (`db:push` command)

### UI Components
- Full shadcn/ui component library (Radix UI primitives)
- Lucide React for icons
- Embla Carousel for carousels
- React Day Picker for calendar components

### Third-Party Services
- Mailgun (email notifications - ACTIVE, requires MAILGUN_API_KEY and MAILGUN_DOMAIN secrets)
- Stripe (payment processing - package installed)
- Nodemailer (email sending - package installed)
- OpenAI and Google Generative AI (AI features - packages installed)
- Passport.js (authentication - package installed)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` for error display
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for development