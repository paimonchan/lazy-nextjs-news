# NewsWire - Next.js News Website

## Project Overview

NewsWire is a modern news website built with Next.js 15, featuring dark mode support, mobile-responsive design, and static site generation. The site displays news articles across multiple categories with a clean, professional interface.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Fonts**: Geist Sans & Geist Mono
- **Theme Management**: next-themes
- **Backend**: Strapi Headless CMS
- **API**: RESTful API calls to Strapi backend

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider, Header, Footer
│   ├── page.tsx                # Home page (featured + latest news)
│   ├── category/[slug]/        # Dynamic category pages
│   │   └── page.tsx
│   ├── article/[id]/           # Dynamic article detail pages
│   │   └── page.tsx
│   └── globals.css             # Global styles with Tailwind v4 & shadcn theme
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── sheet.tsx
│   │   └── separator.tsx
│   ├── theme-provider.tsx      # next-themes wrapper component
│   ├── header.tsx              # Main navigation with category links
│   ├── mobile-nav.tsx          # Mobile hamburger menu (Sheet)
│   ├── news-card.tsx           # Article card component
│   └── footer.tsx              # Site footer
└── lib/
    ├── api.ts                  # Strapi API client functions
    ├── data.ts                 # Mock news data (fallback)
    └── utils.ts                # shadcn utility (cn function)
```

## Data Model

### Article Interface
```typescript
interface Article {
  id: string
  title: string
  description: string
  content: string
  category: string
  image: string
  author: string
  publishedAt: string
}
```

### Categories
- Home (root)
- Technology
- Business
- Sports
- Entertainment
- Health
- Science

## Key Features

### Dark Mode
- Implemented with `next-themes`
- Toggle button in header (Sun/Moon icons from lucide-react)
- System preference detection by default
- Smooth transitions between themes
- CSS variables defined in `globals.css` for light/dark variants

### Responsive Design
- **Mobile**: Hamburger menu, single-column layout
- **Tablet**: 2-column grid for articles
- **Desktop**: 3-column grid, horizontal navigation
- Mobile-first approach with Tailwind breakpoints

### Static Site Generation
- All routes pre-rendered at build time
- `generateStaticParams()` used for dynamic routes
- All 25 articles + 6 category pages generated statically
- SEO-optimized with dynamic metadata

### Component Patterns

#### NewsCard Component
- Props: `article: Article`, `featured?: boolean`
- Featured variant: 2-column layout on desktop with larger text
- Hover states with `group` class for interactive feedback
- Badge for category, placeholder for images

#### Navigation
- Desktop: Horizontal nav in header
- Mobile: Sheet component (slide-out drawer)
- Active state highlighting based on pathname
- Category links use slugs for routing

## Code Conventions

### Formatting
- **Indentation**: 4 spaces (configured in ESLint, Prettier, and tsconfig.json)
- **Semicolons**: Always required
- **Quotes**: Double quotes for strings
- **Trailing commas**: ES5 style
- All files formatted with Prettier (4-space indent)

### Styling
- Use Tailwind utility classes
- Use `cn()` utility for conditional class merging
- Follow shadcn/ui component patterns
- Responsive modifiers: `sm:`, `md:`, `lg:`
- Dark mode: `dark:` prefix

### Components
- Server Components by default
- Client Components marked with `"use client"`
- Async Server Components for pages with params
- Props typed with TypeScript interfaces

### Routing
- App Router with file-based routing
- Dynamic routes use `[param]` folders
- Metadata exported from page components
- Use `notFound()` for 404 handling

### Import Aliases
- `@/` maps to `src/`
- Configured in `tsconfig.json`
- Use for all internal imports

## API Integration

### Strapi Configuration

The app connects to a Strapi headless CMS backend via REST API. Configure the Strapi URL in `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### API Client (src/lib/api.ts)

Provides typed functions for fetching data from Strapi:

- `getArticles(page, pageSize)` - Fetch paginated articles
- `getArticleById(id)` - Fetch single article
- `getArticlesByCategory(categoryName, page, pageSize)` - Filter by category
- `getCategories()` - Fetch all categories
- `getSources()` - Fetch all sources
- `getTrendingArticles(limit)` - Fetch latest articles
- `searchArticles(query, page, pageSize)` - Search articles

### Data Transformation

Articles are fetched from Strapi and converted to the local Article interface:

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

Strapi response fields are mapped:
- `documentId` → `id`
- `title` → `title`
- `summary` → `description`
- `content` → `content`
- `category.name` → `category`
- `source.name` → `author`
- `publishedAt` → `publishedAt` (formatted as date string)

## Helper Functions (src/lib/data.ts)

- `getArticlesByCategory(category: string)` - Filter articles by category
- `getArticleById(id: string)` - Get single article
- `getFeaturedArticle()` - Returns first article (newest)
- `getLatestArticles(count: number)` - Get N latest articles sorted by date

## Development

### Setup with Strapi Backend

1. **Start the Strapi backend** (from D:\Projects\Strapi\strapi-news):
   ```bash
   npm run develop
   ```
   This starts Strapi at http://localhost:1337

2. **Configure environment** (in this project):
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   ```

3. **Start Next.js development server**:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000

### Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build with static generation
npm run start    # Start production server
npm run lint     # Run ESLint
```

### How It Works

- The app fetches data from Strapi REST API at build time and at runtime
- **Build time**: `generateStaticParams()` functions fetch article/category IDs for pre-rendering
- **Runtime**: Pages use `getArticles()`, `getArticleById()`, etc. to fetch fresh data
- **Fallback**: If Strapi is unavailable during build, the app uses default categories and empty params
- **Error handling**: Graceful UI feedback if Strapi is unreachable at runtime

### Adding New Articles
1. Add article object to `articles` array in `src/lib/data.ts`
2. Follow existing structure with all required fields
3. Use existing categories or add new category to `categories` array
4. Build will automatically generate static pages

### Adding New Components
1. For UI components: Use `npx shadcn@latest add [component-name]`
2. For custom components: Place in `src/components/`
3. Use TypeScript interfaces for props
4. Follow existing naming conventions (kebab-case for files)

### Adding New Pages
1. Create folder in `src/app/` following Next.js conventions
2. Export default async function component
3. Export `generateMetadata` for SEO
4. Use `generateStaticParams` for dynamic routes

## Design System (shadcn/ui)

### Installed Components
- Card - Article cards and containers
- Button - Actions and interactive elements
- Badge - Category labels
- Sheet - Mobile navigation drawer
- Separator - Visual dividers

### Theme Colors (CSS Variables)
- Defined in `globals.css` using OKLCH color space
- Light and dark variants for all semantic colors
- Automatically applied via Tailwind utilities
- Customizable via `--color-*` variables in `:root` and `.dark`

### Typography
- Geist Sans - Primary font (headings, body)
- Geist Mono - Monospace font (code)
- Defined as CSS variables: `--font-geist-sans`, `--font-geist-mono`

## Image Handling

Currently using placeholder text for images. To add real images:

1. Place images in `public/` directory
2. Update image paths in mock data
3. Use Next.js `Image` component for optimization
4. Recommended: Use a CDN or image service for production

## Best Practices

### When Making Changes
- Maintain TypeScript type safety - no `any` types
- Keep Server Components server-side when possible
- Use async/await for data fetching
- Follow existing file and folder naming conventions
- Test responsive design at multiple breakpoints
- Verify dark mode appearance

### Adding Features
- Use shadcn/ui components when possible for consistency
- Follow Tailwind-first approach for styling
- Keep components small and focused
- Use composition over prop drilling
- Maintain static generation compatibility

### Performance
- All routes are statically generated
- No client-side data fetching needed
- Images should be optimized (use Next.js Image)
- Minimal JavaScript sent to client
- CSS is scoped and optimized by Tailwind

## Deployment

This project is optimized for static deployment on:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting provider

The build output is fully static with no server-side runtime requirements.

## Troubleshooting

### Strapi Connection Issues

**Problem**: Build fails with "ECONNREFUSED" errors
- **Solution**: Strapi doesn't need to be running at build time. The app gracefully handles unavailable backend and uses default categories for static param generation.

**Problem**: Homepage shows "Strapi Backend Unavailable" message
- **Solution**: Start the Strapi server at http://localhost:1337 or update `NEXT_PUBLIC_STRAPI_URL` in `.env.local`

**Problem**: Articles not loading on category pages
- **Solution**: Verify Strapi is running and articles exist in the database. Check browser console for API errors.

## Future Enhancements

Consider adding:
- Real images with Next.js Image component
- Search functionality (using `searchArticles()` from API client)
- Article pagination
- Related articles section
- Social media sharing
- Comments system
- Newsletter signup
- RSS feed
- Analytics integration
- Reading time calculation
- Article bookmarking
- Caching layer (SWR, React Query)
- Server-side filtering and sorting
