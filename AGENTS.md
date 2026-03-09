# NewsWire - AI Agent Context

## Project Overview

NewsWire is a Next.js 15 news website with Strapi CMS backend, featuring dark mode, responsive design, and static site generation.

**Full documentation**: See `CLAUDE.md` for comprehensive project details.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Strapi Headless CMS (backend)
- next-themes (dark mode)

## Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

## Strapi Backend

- Location: `D:\Projects\Strapi\strapi-news`
- URL: `http://localhost:1337`
- Start with: `npm run develop` (in Strapi project)

## Code Conventions

### Formatting
- **4 spaces indentation** (not tabs)
- Double quotes for strings
- Semicolons required
- Trailing commas: ES5 style

### Styling
- Tailwind utility classes
- `cn()` for conditional class merging
- Dark mode: `dark:` prefix
- Responsive: `sm:`, `md:`, `lg:`

### Components
- Server Components by default
- `"use client"` only when needed
- TypeScript interfaces for all props
- Import alias: `@/` → `src/`

### Files
- kebab-case for component files: `news-card.tsx`
- PascalCase for component names: `NewsCard`

## Project Structure

```
src/
├── app/           # Pages (App Router)
├── components/    # React components
│   └── ui/        # shadcn/ui components
└── lib/           # Utilities, API client, data
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/api.ts` | Strapi API client |
| `src/lib/data.ts` | Mock data fallback |
| `src/components/news-card.tsx` | Article card component |
| `src/app/layout.tsx` | Root layout |

## Data Model

```typescript
interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    image: string;
    author: string;
    publishedAt: string;
}
```

## Categories

Technology, Business, Sports, Entertainment, Health, Science

## Agent Instructions

### Before Making Changes
1. Read relevant files to understand existing patterns
2. Check imports and dependencies in surrounding code
3. Follow existing component structure and naming

### When Writing Code
1. No comments unless requested
2. Maintain type safety - no `any` types
3. Use existing shadcn/ui components when possible
4. Keep components small and focused
5. Follow the 4-space indentation strictly

### After Making Changes
1. Run `npm run lint` to verify code quality
2. Test responsive design (mobile, tablet, desktop)
3. Verify dark mode appearance

## Common Tasks

### Add New Component
1. Place in `src/components/`
2. Use TypeScript interface for props
3. Follow existing patterns from similar components
4. Use `cn()` for class merging

### Add New Page
1. Create folder in `src/app/`
2. Export async component as default
3. Export `generateMetadata` for SEO
4. Use `generateStaticParams` for dynamic routes

### Add shadcn/ui Component
```bash
npx shadcn@latest add [component-name]
```

### Work with Strapi
- API client functions in `src/lib/api.ts`
- Fallback mock data in `src/lib/data.ts`
- Environment: `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`

## Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Notes

- Project uses Tailwind CSS v4 (latest)
- next-themes handles dark mode with system preference
- All routes statically generated at build time
- Strapi can be down during build (graceful fallback)
