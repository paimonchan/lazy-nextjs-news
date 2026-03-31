# PMC News - Architecture & Project Documentation

> Created: 2026-02-22 | Version: 0.1.0

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Folder Structure](#folder-structure)
5. [Domain Layer](#domain-layer)
6. [Infrastructure Layer](#infrastructure-layer)
7. [Application Layer](#application-layer)
8. [Presentation Layer (Pages & Components)](#presentation-layer)
9. [Data Flow](#data-flow)
10. [Strapi API](#strapi-api)
11. [Environment Configuration](#environment-configuration)
12. [Setup & Development](#setup--development)
13. [Code Conventions](#code-conventions)
14. [Error Handling](#error-handling)
15. [Troubleshooting](#troubleshooting)

---

## Overview

**PMC News** is a modern news website built with Next.js 15 (App Router). The application fetches article data from a **Strapi Headless CMS** backend via REST API and displays it with a responsive design and dark mode support.

### Key Features

- News browsing by category (Technology, Business, Sports, etc.)
- Article detail pages
- Dark mode / Light mode (system preference detection)
- Responsive design (mobile, tablet, desktop)
- Static Site Generation (SSG) for optimal performance
- Graceful error handling when Strapi is unavailable

---

## Tech Stack

| Category         | Technology                       | Version  |
| ---------------- | -------------------------------- | -------- |
| Framework        | Next.js (App Router)             | 16.1.6   |
| Language         | TypeScript                       | ^5       |
| Runtime          | React                            | 19.2.3   |
| Styling          | Tailwind CSS v4                  | ^4       |
| UI Components    | shadcn/ui (New York style)       | ^3.8.4   |
| Icons            | lucide-react                     | ^0.564.0 |
| Fonts            | Geist Sans & Geist Mono          | -        |
| Theme Management | next-themes                      | ^0.4.6   |
| UI Primitives    | Radix UI                         | ^1.4.3   |
| Utility          | clsx + tailwind-merge (via `cn`) | -        |
| Backend CMS      | Strapi v5                        | -        |
| Linter           | ESLint                           | ^9       |

---

## System Architecture

This project follows a **Clean Architecture** approach, dividing the codebase into separate layers with a one-way dependency direction (outer to inner):

```
┌─────────────────────────────────────────────────┐
│            PRESENTATION (app/ + components/)     │
│         Next.js Pages, React Components          │
├─────────────────────────────────────────────────┤
│               APPLICATION (application/)         │
│           Use Cases / Business Logic             │
├─────────────────────────────────────────────────┤
│             INFRASTRUCTURE (infrastructure/)     │
│         Strapi API Client, Repositories          │
├─────────────────────────────────────────────────┤
│                 DOMAIN (domain/)                 │
│          Interfaces, Entities, Constants         │
└─────────────────────────────────────────────────┘
```

### Architecture Principles

- **Domain** has no dependencies — it only defines contracts (interfaces).
- **Infrastructure** depends on Domain — implements data access to Strapi.
- **Application** depends on Infrastructure — orchestrates use cases.
- **Presentation** depends on Application — renders UI based on data.

---

## Folder Structure

```
src/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout (ThemeProvider, Header, Footer)
│   ├── page.tsx                    # Home page
│   ├── globals.css                 # Global styles (Tailwind v4 + shadcn CSS vars)
│   ├── favicon.ico
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx            # Dynamic category page
│   └── article/
│       └── [id]/
│           └── page.tsx            # Dynamic article detail page
│
├── components/                     # UI components
│   ├── ui/                         # shadcn/ui components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── separator.tsx
│   │   └── sheet.tsx
│   ├── theme-provider.tsx          # next-themes wrapper
│   ├── header.tsx                  # Main navigation (Client Component)
│   ├── mobile-nav.tsx              # Mobile hamburger menu (Client Component)
│   ├── news-card.tsx               # Article card component
│   ├── footer.tsx                  # Site footer
│   └── error-message.tsx          # Error/warning message component
│
├── domain/                         # Core domain layer
│   ├── article.ts                  # Article interface
│   └── category.ts                 # Category interface + static category data
│
├── infrastructure/                 # Data access implementations
│   └── strapi/
│       ├── client.ts               # Strapi URL & HTTP header configuration
│       ├── types.ts                # TypeScript types for Strapi responses
│       ├── transformers.ts         # StrapiArticle → Article converter
│       ├── article-repository.ts   # Article fetch functions from Strapi
│       └── category-repository.ts  # Category & source fetch functions from Strapi
│
├── application/                    # Use cases (business logic)
│   ├── get-home-articles.ts        # Use case: fetch articles for homepage
│   ├── get-category-articles.ts    # Use case: fetch articles by category
│   └── get-article-detail.ts       # Use case: fetch single article detail
│
└── lib/
    └── utils.ts                    # Utility functions (cn())
```

---

## Domain Layer

### `src/domain/article.ts`

Defines the article data contract used throughout the application:

```typescript
interface Article {
    id: string;           // documentId from Strapi
    title: string;        // Article title
    description: string;  // Article summary/excerpt
    content: string;      // Full article body
    category: string;     // Category name (lowercase)
    image: string;        // Image path (currently: "/placeholder.jpg")
    author: string;       // Source/author name
    publishedAt: string;  // Publication date (format: "YYYY-MM-DD")
}
```

### `src/domain/category.ts`

Defines the interface and static category data used by Header and MobileNav:

```typescript
interface Category {
    name: string;   // Display name (e.g. "Technology")
    slug: string;   // URL slug (e.g. "technology"), empty string for Home
}

const categories: Category[] = [
    { name: "Home", slug: "" },
    { name: "Technology", slug: "technology" },
    { name: "Business", slug: "business" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Health", slug: "health" },
    { name: "Science", slug: "science" },
];
```

> **Note**: Categories here are static data for UI navigation. Valid routing categories are validated dynamically from Strapi.

---

## Infrastructure Layer

### `src/infrastructure/strapi/client.ts`

Strapi connection configuration:

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
export const API_BASE_URL = `${STRAPI_URL}/api`;
```

- Reads the Strapi URL from the `NEXT_PUBLIC_STRAPI_URL` environment variable
- Reads the API token from `STRAPI_API_TOKEN` (optional, for authentication)
- `createHeaders()` generates HTTP headers with a Bearer token if available

### `src/infrastructure/strapi/types.ts`

TypeScript interfaces representing the Strapi v5 response structure:

| Interface                 | Description                            |
| ------------------------- | -------------------------------------- |
| `StrapiArticle`           | Article structure from Strapi          |
| `StrapiCategory`          | Category structure from Strapi         |
| `StrapiSource`            | News source structure from Strapi      |
| `StrapiResponse<T>`       | List response wrapper with pagination  |
| `StrapiSingleResponse<T>` | Single item response wrapper           |

**`StrapiArticle` fields**:

```typescript
interface StrapiArticle {
    id: number;
    documentId: string;      // Unique Strapi v5 ID (used as the article ID)
    title: string;
    summary: string;
    url: string;
    content?: string;        // Full body content (optional)
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    category?: { id, documentId, name };
    source?: { id, documentId, name, url, description? };
}
```

### `src/infrastructure/strapi/transformers.ts`

`convertStrapiToArticle()` converts `StrapiArticle` to `Article`:

| StrapiArticle field    | → | Article field | Transformation                     |
| ---------------------- | - | ------------- | ---------------------------------- |
| `documentId`           | → | `id`          | Direct                             |
| `title`                | → | `title`       | Direct                             |
| `summary`              | → | `description` | Direct                             |
| `content \|\| summary` | → | `content`     | Falls back to summary              |
| `category?.name`       | → | `category`    | Lowercase, defaults to "news"      |
| `/placeholder.jpg`     | → | `image`       | Hardcoded (no real images yet)     |
| `source?.name`         | → | `author`      | Defaults to "Unknown"              |
| `publishedAt`          | → | `publishedAt` | Formatted to "YYYY-MM-DD"          |

### `src/infrastructure/strapi/article-repository.ts`

Functions for accessing the `/api/news-articles` endpoint in Strapi:

| Function                                   | Endpoint                                                            | Description                   |
| ------------------------------------------ | ------------------------------------------------------------------- | ----------------------------- |
| `getArticles(page, size)`                  | `GET /news-articles`                                                | Fetch paginated articles       |
| `getArticleById(docId)`                    | `GET /news-articles/:id`                                            | Fetch a single article         |
| `getArticlesByCategory(name, page, size)`  | `GET /news-articles?filters[category][name][$eq]=...`               | Filter by category             |
| `getArticlesBySource(name, page, size)`    | `GET /news-articles?filters[source][name][$eq]=...`                 | Filter by source               |
| `getTrendingArticles(limit)`               | `GET /news-articles?pagination[limit]=...`                          | Fetch latest articles          |
| `searchArticles(query, page, size)`        | `GET /news-articles?filters[$or][0][title][$containsi]=...`         | Search articles                |
| `getArticlesByDateRange(start, end, page, size)` | `GET /news-articles?filters[publishedAt][$gte]=...`           | Filter by date range           |

All queries include:
- `populate: "*"` — includes relations (category, source)
- `sort[0]: "publishedAt:desc"` — newest first
- `filters[publishedAt][$notNull]: "true"` — only published articles

### `src/infrastructure/strapi/category-repository.ts`

Functions for accessing the `/api/categories` and `/api/sources` endpoints:

| Function                   | Endpoint              | Description          |
| -------------------------- | --------------------- | -------------------- |
| `getCategories()`          | `GET /categories`     | All categories       |
| `getCategoryById(docId)`   | `GET /categories/:id` | Single category      |
| `getSources()`             | `GET /sources`        | All news sources     |
| `getSourceById(docId)`     | `GET /sources/:id`    | Single source        |

---

## Application Layer

Use cases orchestrate the infrastructure layer and return clean data to the presentation layer.

### `src/application/get-home-articles.ts`

```
getHomeArticles() → { featured: Article, latest: Article[] } | null
```

- Fetches the 13 most recent articles from Strapi
- The first article becomes `featured`
- Articles 2–13 become `latest`
- Returns `null` if Strapi is unavailable (try/catch)

### `src/application/get-category-articles.ts`

```
getCategoryArticles(slug) → { categoryName, articles, validSlugs } | null
```

- Validates whether `slug` is a valid category in Strapi
- Fetches articles for that category (max 25 articles)
- Returns `null` if the slug is invalid

### `src/application/get-article-detail.ts`

```
getArticleDetail(id) → ArticleDetail | null
```

`ArticleDetail` is distinct from `Article` — it is richer for the detail view:

```typescript
interface ArticleDetail {
    id: string;
    title: string;
    summary: string;
    categoryName: string;        // lowercase
    categorySlug: string;        // same as categoryName
    authorName: string;
    publishedAt: string;         // "YYYY-MM-DD"
    contentParagraphs: string[]; // Array of paragraphs from content
}
```

Content is split into paragraphs as follows:
- If `content` exists → split by `"\n\n"`
- If only `summary` exists → split by `". "`

---

## Presentation Layer

### Pages

#### `src/app/layout.tsx` — Root Layout

- Loads **Geist Sans** and **Geist Mono** fonts from Google Fonts
- Wraps the app with `ThemeProvider` (next-themes)
- Includes `<Header />` and `<Footer />` on all pages
- Global metadata: title "PMC News - Your Daily News Source"

#### `src/app/page.tsx` — Homepage

- **Server Component**, async
- Calls `getHomeArticles()`
- Renders `<NewsCard featured />` for the featured article
- 3-column grid for `latest` articles
- Shows `<ErrorMessage variant="warning">` if Strapi is unavailable

#### `src/app/category/[slug]/page.tsx` — Category Page

- **Server Component**, async, dynamic route `[slug]`
- `generateStaticParams()`: fetches categories from Strapi, falls back to 6 default slugs
- `generateMetadata()`: dynamic title based on category name
- Calls `getCategoryArticles(slug)`
- 3-column grid for article listing
- `notFound()` if the slug is invalid

#### `src/app/article/[id]/page.tsx` — Article Detail Page

- **Server Component**, async, dynamic route `[id]`
- `generateStaticParams()`: fetches all article `documentId`s from Strapi (max 100)
- `generateMetadata()`: title and description from article data
- Calls `getArticleDetail(id)`
- Layout: back button, category badge, title, summary, author, image placeholder, article body
- `notFound()` if the article is not found

### Components

#### `src/components/header.tsx` — Navigation Header

- **Client Component** (`"use client"`)
- Sticky header with backdrop blur
- **PMC News** logo linking to homepage
- Desktop horizontal nav: category links from `domain/category.ts`
- Active state based on `usePathname()`
- Dark/light mode toggle (Sun/Moon icons with CSS animation)
- `<MobileNav />` for mobile viewports

#### `src/components/mobile-nav.tsx` — Mobile Navigation

- **Client Component** (`"use client"`)
- Hamburger button (icon `Menu`) visible only on mobile (`md:hidden`)
- Uses the **Sheet** component from shadcn/ui (slides in from the left)
- Category links with active state
- Sheet closes automatically on navigation

#### `src/components/news-card.tsx` — Article Card

- **Server Component** (no `"use client"`)
- Props: `article: Article`, `featured?: boolean`
- `featured` mode: 2-column layout on desktop, larger image
- Default mode: standard vertical card layout
- Hover effect using the `group` class
- Displays: image placeholder, category badge, date, title, description (2 lines), author name
- The entire card is a link to `/article/{id}`

#### `src/components/error-message.tsx` — Error Message

- **Server Component**
- Props: `title?`, `message`, `variant: "error" | "warning"`
- `warning`: yellow box with border (used when Strapi is unavailable)
- `error`: simple red text (used for runtime errors)

---

## Data Flow

### Homepage

```
page.tsx (Home)
  └── getHomeArticles()                    [application]
        └── getArticles(1, 13)             [infrastructure]
              └── GET /api/news-articles    [Strapi API]
        └── convertStrapiToArticle()       [transformer]
  └── <NewsCard featured /> + <NewsCard /> [component]
```

### Category Page

```
page.tsx (Category)
  ├── generateStaticParams()
  │     └── getCategories()               [infrastructure]
  │           └── GET /api/categories     [Strapi API]
  └── getCategoryArticles(slug)           [application]
        ├── getCategories()               [infrastructure] - slug validation
        └── getArticlesByCategory(name)   [infrastructure]
              └── GET /api/news-articles?filters[category][name][$eq]=...
        └── convertStrapiToArticle()      [transformer]
  └── <NewsCard /> × N                    [component]
```

### Article Detail Page

```
page.tsx (Article)
  ├── generateStaticParams()
  │     └── getArticles(1, 100)           [infrastructure]
  │           └── GET /api/news-articles  [Strapi API]
  └── getArticleDetail(id)                [application]
        └── getArticleById(docId)         [infrastructure]
              └── GET /api/news-articles/:id?populate=*
  └── Render ArticleDetail                [JSX]
```

---

## Strapi API

### Endpoints Used

| Method | URL                                                         | Used by                           |
| ------ | ----------------------------------------------------------- | --------------------------------- |
| GET    | `/api/news-articles`                                        | getArticles, getTrendingArticles  |
| GET    | `/api/news-articles?filters[category][name][$eq]=...`       | getArticlesByCategory             |
| GET    | `/api/news-articles?filters[source][name][$eq]=...`         | getArticlesBySource               |
| GET    | `/api/news-articles?filters[$or][0][title][$containsi]=...` | searchArticles                    |
| GET    | `/api/news-articles?filters[publishedAt][$gte]=...`         | getArticlesByDateRange            |
| GET    | `/api/news-articles/:documentId?populate=*`                 | getArticleById                    |
| GET    | `/api/categories`                                           | getCategories                     |
| GET    | `/api/categories/:documentId`                               | getCategoryById                   |
| GET    | `/api/sources`                                              | getSources                        |
| GET    | `/api/sources/:documentId`                                  | getSourceById                     |

### Pagination Response Structure

```json
{
    "data": [...],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 25,
            "pageCount": 4,
            "total": 100
        }
    }
}
```

---

## Environment Configuration

### `.env.local` (must be created manually)

```env
# Strapi backend URL (required)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Strapi API token (optional, for protected endpoints)
STRAPI_API_TOKEN=your_strapi_api_token_here
```

- `NEXT_PUBLIC_STRAPI_URL`: Public, accessible in the browser (client-side)
- `STRAPI_API_TOKEN`: Private, server-only (no `NEXT_PUBLIC_` prefix)

---

## Setup & Development

### Prerequisites

- Node.js >= 18
- Strapi v5 backend running at `http://localhost:1337`
- Strapi project path: `D:\Projects\Strapi\strapi-news`

### Setup Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create the environment file**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local as needed
   ```

3. **Start the Strapi backend** (in a separate terminal):
   ```bash
   cd D:\Projects\Strapi\strapi-news
   npm run develop
   # Strapi available at http://localhost:1337
   ```

4. **Start the Next.js development server**:
   ```bash
   npm run dev
   # App available at http://localhost:3000
   ```

### Scripts

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Development server with hot reload             |
| `npm run build` | Production build (SSG for all pages)           |
| `npm run start` | Start the production build                     |
| `npm run lint`  | Run ESLint checks                              |

### Adding New Articles

Articles are managed entirely through the Strapi Admin Panel (`http://localhost:1337/admin`). There is no hardcoded article data in this project.

---

## Code Conventions

### Formatting

- **Indentation**: 4 spaces (configured in Prettier and ESLint)
- **Semicolons**: Always required
- **Quotes**: Double quotes for strings
- **Trailing commas**: ES5 style

### TypeScript

- No `any` types
- All component props must use TypeScript interfaces
- Use `import type { ... }` for pure type-only imports

### Next.js Components

- **Server Components** by default (all page components)
- **Client Components** only when state/hooks are required (`"use client"` on the first line)
- Current Client Components: `header.tsx`, `mobile-nav.tsx`

### Import Aliases

All internal imports use the `@/` alias mapped to `src/`:

```typescript
import type { Article } from "@/domain/article";
import { getHomeArticles } from "@/application/get-home-articles";
import { NewsCard } from "@/components/news-card";
```

---

## Error Handling

### Error Handling Strategy

| Layer          | Strategy                                                              |
| -------------- | --------------------------------------------------------------------- |
| Infrastructure | Throws `Error` if the response is not OK (`!response.ok`)            |
| Application    | try/catch, returns `null` on failure                                  |
| Presentation   | Checks for null from use case, shows `<ErrorMessage>` or `notFound()` |

### Error Scenarios

1. **Strapi is not running at runtime**:
   - Homepage: displays a yellow "Strapi Backend Unavailable" banner
   - Category page: displays a red error message
   - Article page: displays a red error message

2. **Strapi is not running during build** (`npm run build`):
   - `generateStaticParams` for categories: uses 6 default slugs (technology, business, etc.)
   - `generateStaticParams` for articles: returns an empty array (no article pages pre-rendered)
   - Build does not fail — only a warning is logged to the console

3. **Article or category not found**:
   - Calls `notFound()` from next/navigation → renders the 404 page

---

## Troubleshooting

| Problem                              | Cause                               | Solution                                                        |
| ------------------------------------ | ----------------------------------- | --------------------------------------------------------------- |
| Homepage blank / yellow banner       | Strapi is not running               | Run `npm run develop` in the Strapi project directory           |
| Build error `ECONNREFUSED`           | Strapi accessed during build        | Already handled — build should still succeed                    |
| Articles missing on category page    | Category name mismatch in Strapi    | Ensure category names in Strapi match (case-insensitive)        |
| Article page returns 404             | Invalid `documentId`                | Ensure the article exists in Strapi and is published            |
| Dark mode not working                | ThemeProvider not mounted correctly | Ensure `suppressHydrationWarning` is set on the `<html>` tag   |
| Environment variable not read        | `.env.local` file is missing        | Copy from `.env.example` and fill in the values                 |
