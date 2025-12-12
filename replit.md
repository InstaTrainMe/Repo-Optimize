# InstaTrainMe

## Overview

InstaTrainMe is a fitness platform landing page that connects users with certified personal trainers and gyms. The application serves as a marketing website with lead generation forms for partners (trainers) and gyms, along with a blog section for fitness content. The platform promotes a mobile app available on the App Store.

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
- **Current Tables**: users, partner_submissions, gym_submissions, newsletter_subscriptions
- **Development Storage**: MemStorage class provides in-memory fallback when database unavailable

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (shadcn/ui library)
    pages/        # Route components (home, blog, not-found)
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

### Third-Party Services (potential integrations based on dependencies)
- Stripe (payment processing - package installed)
- Nodemailer (email sending - package installed)
- OpenAI and Google Generative AI (AI features - packages installed)
- Passport.js (authentication - package installed)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` for error display
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for development