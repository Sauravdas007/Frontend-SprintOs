# AI SprintOS

A production-grade, AI-powered sprint and project management platform built with Next.js 15, TypeScript, Tailwind CSS, and modern React patterns.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Drag & Drop**: dnd-kit
- **Auth**: NextAuth.js v5
- **Charts**: Recharts
- **Icons**: Lucide React

## Features

- **AI Task Generator**: Generate subtasks, story points, and sprint estimations from feature descriptions
- **AI Bug Triage**: Automatic root cause analysis and fix suggestions from stack traces
- **Kanban Board**: Full drag-and-drop with optimistic updates, filters, and search
- **Sprint Management**: Velocity tracking, burndown charts, and sprint planning
- **GitHub Integration**: Two-way sync with issues, PRs, and commits
- **Analytics Dashboard**: Sprint velocity, bug frequency, AI usage, and team productivity metrics
- **Role-Based Access**: ADMIN, MANAGER, DEVELOPER roles with protected routes
- **Command Palette**: Keyboard-driven navigation (⌘K)
- **Dark Mode**: Full theme support with system preference detection

## Project Structure

```
apps/web/
  app/                    # Next.js App Router pages
    (public)/             # Public routes (landing, auth)
    (dashboard)/          # Protected dashboard routes
    api/auth/             # NextAuth.js configuration
  components/
    ui/                   # Reusable UI primitives
    layout/               # Sidebar, Navbar
    kanban/               # Board, Column, Card, Modal
    ai/                   # Task Generator, Bug Triage
    analytics/            # Charts and dashboards
    github/               # GitHub integration UI
    shared/               # CommandPalette, NotificationPanel
  hooks/                  # TanStack Query hooks
  lib/                    # API client, utilities
  store/                  # Zustand stores
  providers/              # QueryProvider, ThemeProvider
  types/                  # TypeScript interfaces
  styles/                 # Global CSS
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Demo Credentials

- **Email**: `admin@aisprintos.dev`
- **Password**: `password`

## Key Patterns

- **Server/Client Components**: Proper separation with "use client" directives
- **Optimistic Updates**: UI updates before API confirmation with rollback
- **Loading States**: Skeleton loaders throughout
- **Error Boundaries**: Graceful error handling
- **Keyboard Shortcuts**: ⌘K for command palette
- **Responsive Design**: Mobile-first with collapsible sidebar
