# Overview

This is a comprehensive ERP (Enterprise Resource Planning) system for the MBA department of Gaya College. The application serves both teachers and students with role-based interfaces. Teachers can manage students, attendance, exams, timetables, e-books, and marks. Students can view their attendance, timetable, marks, e-books, take notes, and participate in online exams. The system implements soft-delete functionality for student records, ensuring data is never permanently lost without admin action.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: shadcn/ui built on Radix UI primitives with Tailwind CSS for styling. The design follows a "clarity over creativity" principle optimized for educational data density and professional aesthetics.

**Routing**: Wouter for lightweight client-side routing

**State Management**: 
- TanStack Query (React Query) for server state management
- React Context for authentication state
- Local component state for UI interactions

**Design Tokens**:
- Typography: Inter (primary), JetBrains Mono (monospace for IDs/codes)
- Spacing: Consistent 2, 4, 6, 8, 12, 16 unit scale
- Theme: Dark/light mode support with CSS variables
- Layout: Responsive grid system with max-width containers

**Key Features**:
- Role-based dashboard views (Teacher vs Student)
- Sidebar navigation with collapsible states
- Theme toggle (dark/light modes)
- Toast notifications for user feedback
- Chatbot assistant component (placeholder for AI integration)

## Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Design**: RESTful API structure with `/api` prefix routing

**Authentication & Authorization**:
- JWT-based authentication stored in HTTP-only cookies
- Role-based access control (teacher/student roles)
- Middleware for route protection (`authenticate` middleware)
- Password hashing with bcryptjs

**Database Access Layer**: 
- Drizzle ORM for type-safe database operations
- Neon serverless PostgreSQL driver
- Schema-first design with TypeScript types generated from Drizzle schemas

**Key Architectural Decisions**:
- Separation of concerns with dedicated route, service, and middleware layers
- Cookie-based session management for security
- Environment variable configuration for database connections
- Development and production build scripts with esbuild

## Data Storage

**Database**: PostgreSQL (configured for Neon serverless)

**Schema Design**:
- `users` table: Core authentication and user profiles with role enum (teacher/student)
- `students` table: Extended student information linked to users
- `subjects`, `attendance`, `exams`, `marks`, `timetables`, `ebooks` tables (referenced but implementations pending)
- Enums for type safety: role, status, attendance_status, exam_type, access_policy

**Key Data Patterns**:
- Soft delete via `status` enum (active/archived) rather than hard deletes
- UUID primary keys for all entities
- Foreign key relationships maintaining referential integrity
- Audit fields: `createdAt`, `createdBy`, `deletedBy` for tracking changes

**Migration Strategy**: Drizzle Kit for schema migrations with `migrations/` directory

## External Dependencies

**Core Runtime Dependencies**:
- `@neondatabase/serverless`: Serverless PostgreSQL client for Neon database
- `drizzle-orm`: Type-safe ORM with PostgreSQL dialect
- `bcryptjs`: Password hashing for authentication
- `jsonwebtoken`: JWT token generation and verification
- `cookie-parser`: Cookie parsing middleware for session management

**Frontend UI Dependencies**:
- `@radix-ui/*`: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, select, tabs, toast, etc.)
- `@tanstack/react-query`: Server state management and data fetching
- `react-hook-form` + `@hookform/resolvers`: Form handling with validation
- `zod`: Schema validation and type inference
- `clsx` + `tailwind-merge`: Conditional CSS class management
- `date-fns`: Date manipulation utilities
- `qrcode`: QR code generation for ID cards
- `lucide-react`: Icon library

**Development Tools**:
- `vite`: Frontend build tool and dev server
- `tsx`: TypeScript execution for development
- `esbuild`: Fast JavaScript/TypeScript bundler for production builds
- `drizzle-kit`: Database migration tool
- Replit-specific plugins for development environment integration

**Planned Integrations** (referenced in specifications):
- File upload for e-books and exam submissions
- CSV import for bulk attendance data
- Calendar export (ICS format) for timetables
- Potential plagiarism detection for online exams
- Email notifications (infrastructure not yet implemented)