# replit.md

## Overview

Metrix Media is a modern digital marketing agency website built as a single-page application. The project showcases the company's services including viral content creation, meme marketing, paid advertising, and data-driven campaigns. The application features a clean, professional design with interactive elements, contact forms, case studies, and comprehensive SEO optimization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful endpoints with rate limiting and error handling
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **Development**: Hot module replacement with Vite middleware integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon for scalability and reliability
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Tables**: 
  - Users table for authentication
  - Contact submissions table for form data with honeypot spam protection
- **Validation**: Zod schemas shared between client and server for consistency

### Authentication and Authorization
- **User Management**: Custom user system with username/password authentication
- **Session Storage**: Server-side sessions stored in PostgreSQL
- **Rate Limiting**: In-memory rate limiting for contact form submissions (5 requests per 15 minutes)
- **Security**: Honeypot field implementation for spam protection

### External Dependencies

- **Email Service**: SendGrid for transactional email sending (contact form notifications)
- **Database Hosting**: Neon serverless PostgreSQL for managed database infrastructure
- **UI Components**: Radix UI primitives for accessible, unstyled component foundations
- **Font Loading**: Google Fonts integration for Inter, Architects Daughter, DM Sans, Fira Code, and Geist Mono
- **Icons**: Lucide React icons with additional React Icons for social media
- **Development Tools**: 
  - Replit-specific plugins for development banner and error overlay
  - ESBuild for server bundling
  - PostCSS with Autoprefixer for CSS processing

### SEO and Performance
- **Meta Tags**: Comprehensive Open Graph and Twitter Card metadata
- **Structured Data**: JSON-LD schema markup for organization and service information
- **Sitemap**: Dynamic XML sitemap generation
- **Performance**: Optimized asset loading and code splitting with Vite
- **Accessibility**: WCAG-compliant components from Radix UI foundation

### Deployment Architecture
- **Production Build**: Separate client and server builds
- **Static Assets**: Client application built to dist/public directory
- **Server**: Node.js application with ESM module support
- **Environment**: Development and production environment configuration
- **Package Management**: NPM with lockfile for dependency consistency