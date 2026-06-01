# Learning Dashboard

A futuristic student dashboard built with Next.js 16, Supabase, Framer Motion, and Tailwind CSS v4.

## Live Demo
https://learning-dashboard-lyart.vercel.app/

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Architecture Decisions

### Server / Client Component Split
- `app/page.tsx` is a **Server Component** — fetches course data directly from Supabase on the server so no API keys are exposed to the browser
- `CourseGrid.tsx`, `Sidebar.tsx`, `CourseCard.tsx`, `HeroTile.tsx` are **Client Components** (`"use client"`) because they use Framer Motion hooks and browser interactions
- `ActivityTile.tsx` is a Client Component using `useMemo` with a seeded random function to ensure consistent server/client rendering (avoiding hydration mismatches)

### Supabase SSR Pattern
Used `@supabase/ssr` instead of the standard `@supabase/supabase-js` client because it is designed specifically for server-side rendering and correctly handles cookies in the Next.js App Router context.

### Animation Strategy — Zero Layout Shifts
All Framer Motion animations exclusively use `transform` (via `scale`, `y`, `x`) and `opacity`. No layout-affecting properties (`width`, `height`, `top`, `left`) are animated directly, ensuring zero layout shifts and GPU-accelerated rendering throughout.

### Key Animation Details
- **Staggered entrance**: CourseGrid uses `staggerChildren: 0.12` so cards appear sequentially
- **Spring physics**: All hover interactions use `type: "spring", stiffness: 300, damping: 20`
- **layoutId**: Sidebar uses `layoutId="activeIndicator"` for smooth active item transitions
- **Progress bar**: Animates from `0%` to actual value on mount using Framer Motion `animate`

## Local Setup

1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
3. Run `npm install`
4. Run `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp default now()
);
```

## Security Note
RLS (Row Level Security) is disabled on the `courses` table for this prototype.
In production, a proper policy would be:

```sql
create policy "Allow public read" on courses for select using (true);
```

## Environment Variables

See `.env.example` for required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_USER_NAME=
```
- **Code Review**: CodeRabbit AI