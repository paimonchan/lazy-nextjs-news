# Lazy Next.js News - Modern News Website

## Project Overview

Lazy Next.js News is a modern news website built with Next.js 15, featuring dark mode support, mobile-responsive design, and static site generation. The site displays mock news articles across multiple categories with a clean, professional interface. It connects to a Strapi Headless CMS backend for its content.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **UI Components**: shadcn/ui (New York style)
-   **Fonts**: Geist Sans & Geist Mono
-   **Theme Management**: `next-themes`
-   **Backend**: Strapi Headless CMS
-   **API**: RESTful API calls to Strapi backend

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
    ├── data.ts                 # Mock news data (fallback/local data)
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
- All routes pre-rendered at build time for optimal performance.
- `generateStaticParams()` functions (in page.tsx files) use API calls to fetch IDs for pre-rendering dynamic routes.
- All articles and category pages can be generated statically.
- SEO-optimized with dynamic metadata.

### Component Patterns

#### NewsCard Component
- Props: `article: Article`, `featured?: boolean`
- Featured variant: 2-column layout on desktop with larger text
- Hover states with `group` class for interactive feedback
- Badge for category, placeholder for images

#### Navigation
- Desktop: Horizontal navigation in the header.
- Mobile: Sheet component (slide-out drawer) for mobile navigation.
- Active state highlighting based on the current pathname.
- Category links use slugs for routing.

## Code Conventions

### Formatting
-   **Indentation**: 4 spaces (configured in ESLint, Prettier, and `tsconfig.json`)
-   **Semicolons**: Always required
-   **Quotes**: Double quotes for strings
-   **Trailing commas**: ES5 style
-   All files formatted with Prettier (4-space indent).

### Styling
-   Primarily uses Tailwind utility classes.
-   Utilizes `cn()` utility for conditional class merging.
-   Follows shadcn/ui component patterns.
-   Responsive modifiers: `sm:`, `md:`, `lg:`.
-   Dark mode styling: `dark:` prefix.

### Components
-   Server Components are used by default.
-   Client Components are explicitly marked with `"use client"`.
-   Asynchronous Server Components are used for pages with parameters.
-   Props are strongly typed with TypeScript interfaces.

### Routing
-   Next.js App Router is used with file-based routing.
-   Dynamic routes utilize `[param]` folders (e.g., `[id]`, `[slug]`).
-   Metadata is exported from page components for SEO.
-   `notFound()` function is used for 404 handling.

### Import Aliases
-   `@/` maps to `src/`.
-   Configured in `tsconfig.json` for all internal imports.

## API Integration

### Strapi Configuration

The application connects to a Strapi headless CMS backend via its REST API. The Strapi URL and API Token are configured via environment variables:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_key_here
```

### API Client (`src/lib/api.ts`)

This file provides typed asynchronous functions for fetching data from the Strapi backend, including an Authorization header for the API token:

-   `getArticles(page, pageSize)`: Fetches paginated news articles.
-   `getArticleById(id)`: Fetches a single news article by its ID.
-   `getArticlesByCategory(categoryName, page, pageSize)`: Fetches paginated articles filtered by category.
-   `getCategories()`: Fetches all available categories.
-   `getSources()`: Fetches all available news sources.
-   `getTrendingArticles(limit)`: Fetches a limited number of the latest (trending) articles.
-   `searchArticles(query, page, pageSize)`: Searches articles based on a query.

### Data Transformation

Articles are fetched from Strapi and converted to the local `Article` interface (defined in Data Model section). Strapi response fields are mapped to the local interface properties.

## Helper Functions (`src/lib/data.ts`)

This file contains mock news data (which can act as a fallback) and helper functions, such as:

-   `getArticlesByCategory(category: string)`: Filters articles by category (locally).
-   `getArticleById(id: string)`: Gets a single article by ID (locally).
-   `getFeaturedArticle()`: Returns the first article (newest) (locally).
-   `getLatestArticles(count: number)`: Gets N latest articles sorted by date (locally).

## Development

### Setup with Strapi Backend

To run the application with a Strapi backend:

1.  **Start the Strapi backend**: Ensure your Strapi instance is running (e.g., from `D:\Projects\Strapi\strapi-news` using `npm run develop` or `yarn develop`). It typically runs on `http://localhost:1337`.
2.  **Configure environment**: Create or update the `.env.local` file in the root of this project with your Strapi URL and API token:
    ```env
    NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
    STRAPI_API_TOKEN=your_strapi_api_key_here
    ```
3.  **Start Next.js development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

### Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build with static generation
npm run start    # Start production server
npm run lint     # Run ESLint
```

### How It Works

-   The application fetches data from the Strapi REST API at both build time and runtime.
-   **Build time**: `generateStaticParams()` functions in dynamic routes fetch article/category IDs from Strapi for pre-rendering pages.
-   **Runtime**: Pages and components use API client functions (e.g., `getArticles()`, `getArticleById()`) to fetch fresh data.
-   **Fallback**: If the Strapi backend is unavailable during the build process, the application can gracefully use default categories and empty parameters for static page generation.
-   **Error handling**: The API client includes error handling for network issues or failed API responses, providing graceful UI feedback.

### Adding New Articles
If using the local `src/lib/data.ts` as a fallback or for local development:
1.  Add a new article object to the `articles` array in `src/lib/data.ts`.
2.  Ensure it follows the existing `Article` interface structure with all required fields.
3.  Use existing categories or add a new category to the `categories` array if needed.
*(Note: For production, articles should be managed directly within the Strapi CMS.)*

### Adding New Components
1.  For UI components, consider using `npx shadcn@latest add [component-name]` if applicable.
2.  For custom components, place them in `src/components/`.
3.  Always use TypeScript interfaces for component props.
4.  Follow existing naming conventions (e.g., kebab-case for files).

### Adding New Pages
1.  Create a new folder in `src/app/` following Next.js App Router conventions.
2.  Export a default `async` function component for data fetching.
3.  Export `generateMetadata` for SEO.
4.  Use `generateStaticParams` for dynamic routes if pre-rendering is desired.

## Design System (shadcn/ui)

### Installed Components
-   **Card**: Used for displaying article cards and general content containers.
-   **Button**: For actions and interactive elements.
-   **Badge**: For displaying category labels.
-   **Sheet**: Utilized for the mobile navigation drawer (hamburger menu).
-   **Separator**: For visual dividers.

### Theme Colors (CSS Variables)
-   Defined in `globals.css` using the OKLCH color space.
-   Light and dark variants are available for all semantic colors.
-   Automatically applied via Tailwind utilities.
-   Customizable via `--color-*` CSS variables in `:root` and `.dark` selectors.

### Typography
-   **Geist Sans**: Primary font for headings and body text.
-   **Geist Mono**: Monospace font, typically used for code snippets.
-   Defined as CSS variables: `--font-geist-sans`, `--font-geist-mono`.

## Image Handling

Currently, the project uses placeholder text for images. To integrate real images:

1.  Place images in the `public/` directory for static assets.
2.  Update image paths in your data (either local mock data or Strapi content).
3.  Use Next.js `Image` component for optimized image loading and performance.
4.  For production, consider using a CDN or dedicated image service.

## Best Practices

### When Making Changes
-   Maintain TypeScript type safety; avoid using `any` types.
-   Keep Server Components server-side when possible to leverage their benefits.
-   Use `async/await` for asynchronous data fetching operations.
-   Follow existing file and folder naming conventions for consistency.
-   Test responsive design across multiple breakpoints.
-   Verify dark mode appearance.

### Adding Features
-   Prioritize using existing shadcn/ui components for consistency.
-   Follow a Tailwind-first approach for styling.
-   Keep components small, focused, and reusable.
-   Favor composition over prop drilling.
-   Maintain static generation compatibility for performance.

### Performance
-   All routes are statically generated where possible, reducing server load.
-   Minimal client-side data fetching where server components can pre-fetch.
-   Images should be optimized (e.g., with Next.js Image component).
-   Minimal JavaScript bundle size sent to the client.
-   CSS is scoped and optimized by Tailwind.

## Deployment

This project is optimized for static deployment on various platforms:
-   Vercel (recommended)
-   Netlify
-   GitHub Pages
-   Any static hosting provider

The build output is fully static with no server-side runtime requirements for the Next.js application itself, assuming data is pre-fetched during the build process.

## Troubleshooting

### Strapi Connection Issues

**Problem**: Build fails with "ECONNREFUSED" errors.
-   **Solution**: The application is designed to gracefully handle an unavailable Strapi backend at build time. It will use default categories and empty parameters for static param generation. Ensure your Strapi server is not required to be running *during* the Next.js build step if you want a fully static build without a running backend.

**Problem**: Homepage shows "Strapi Backend Unavailable" message or no data.
-   **Solution**: Verify that your Strapi server is running and accessible at the URL specified in `NEXT_PUBLIC_STRAPI_URL` (e.g., `http://localhost:1337`). Check your browser console for API errors.

**Problem**: Articles not loading on category or article detail pages.
-   **Solution**: Ensure Strapi is running and that articles exist in your Strapi database. Check the browser console and network tab for any API request errors.

## Future Enhancements

Consider adding the following features for further development:
-   Real images with Next.js Image component.
-   Search functionality (utilizing the `searchArticles()` API client function).
-   Article pagination for large datasets.
-   A "Related Articles" section.
-   Social media sharing buttons.
-   A comments system.
-   Newsletter signup integration.
-   RSS feed generation.
-   Analytics integration.
-   Reading time calculation for articles.
-   Article bookmarking functionality.
-   Caching layer (e.g., using SWR or React Query) for client-side data.
-   Server-side filtering and sorting capabilities.

## Gemini CLI Usage

The Gemini CLI can be a powerful tool for interacting with and developing this project. Here are some ways to leverage it:

-   **Codebase Investigation**: Use `codebase_investigator` to understand module dependencies, component usage, or architectural patterns.
-   **File Operations**: Utilize `read_file` to inspect code, `replace` for targeted modifications, and `write_file` for creating new files or extensive changes.
-   **Command Execution**: Run development commands like `npm run dev`, `npm run build`, or `npm run lint` using `run_shell_command`.
-   **Code Search**: Employ `grep_search` to find specific patterns, function usages, or text across the project files.
-   **Task Management**: Use `write_todos` to break down complex features or fixes into manageable steps and track progress.
