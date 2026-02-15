# Strapi Integration Guide

This document describes how the NewsWire Next.js frontend integrates with the Strapi backend CMS.

## Overview

The Next.js frontend is configured to fetch article data from a Strapi headless CMS backend running at `http://localhost:1337` (by default).

## Architecture

```
┌─────────────────────────────────────────┐
│     Next.js Frontend (This Project)     │
│    - App Router with Static Generation  │
│    - 4-space indentation                │
│    - TypeScript, Tailwind, shadcn/ui    │
└──────────────────┬──────────────────────┘
                   │
                   │ REST API Calls
                   │
┌──────────────────▼──────────────────────┐
│    Strapi Backend (strapi-news)         │
│    - Headless CMS                       │
│    - SQLite/PostgreSQL Database         │
│    - Collections: News, Categories, etc │
└─────────────────────────────────────────┘
```

## API Layer (src/lib/api.ts)

A fully typed API client for Strapi v5 with the following functions:

### Core Functions

```typescript
// Articles
getArticles(page: number = 1, pageSize: number = 25)
getArticleById(documentId: string)
getArticlesByCategory(categoryName: string, page: number = 1, pageSize: number = 25)
getArticlesBySource(sourceName: string, page: number = 1, pageSize: number = 25)
getTrendingArticles(limit: number = 10)
searchArticles(query: string, page: number = 1, pageSize: number = 25)
getArticlesByDateRange(startDate: string, endDate: string, page: number = 1, pageSize: number = 25)

// Categories
getCategories()
getCategoryById(documentId: string)

// Sources
getSources()
getSourceById(documentId: string)
```

### Type Definitions

```typescript
// Strapi v5 response types
interface StrapiArticle {
    id: number;                      // Strapi internal ID
    documentId: string;               // Use this for URLs and API calls
    title: string;
    summary: string;                  // Article description/excerpt
    content?: string;                 // Full article content (optional)
    url: string;                      // Original article URL
    publishedAt: string;              // ISO 8601 datetime
    createdAt: string;
    updatedAt: string;
    category?: {
        id: number;
        documentId: string;
        name: string;  // e.g., "Technology", "Business"
    };
    source?: {
        id: number;
        documentId: string;
        name: string;  // e.g., "TechCrunch", "CNN"
        url: string;
        description?: string;
    };
}

interface StrapiCategory {
    id: number;
    documentId: string;
    name: string;
}

interface StrapiSource {
    id: number;
    documentId: string;
    name: string;
    url: string;
    description?: string;
}
```

## Data Transformation

Strapi articles are converted to the internal Article interface:

```typescript
function convertStrapiToArticle(strapiArticle: StrapiArticle) {
    return {
        id: strapiArticle.documentId,
        title: strapiArticle.title,
        description: strapiArticle.summary,
        content: strapiArticle.content || strapiArticle.summary,
        category: strapiArticle.category?.name?.toLowerCase() || "news",
        image: "/placeholder.jpg",
        author: strapiArticle.source?.name || "Unknown",
        publishedAt: new Date(strapiArticle.publishedAt)
            .toISOString()
            .split("T")[0],
    };
}
```

## Strapi v5 API Endpoints

This frontend uses **Strapi v5** REST API with these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news-articles` | List all published articles |
| GET | `/api/news-articles/:documentId` | Get single article |
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:documentId` | Get single category |
| GET | `/api/sources` | List all sources |
| GET | `/api/sources/:documentId` | Get single source |

### Query Parameters

**Common filters and options:**
```
populate=*                                    // Include all relationships
filters[publishedAt][$notNull]=true          // Only published articles
filters[category][name][$eq]=Technology      // Filter by category name
filters[source][name][$eq]=TechCrunch        // Filter by source name
filters[title][$containsi]=query             // Search by title (case-insensitive)
sort[0]=publishedAt:desc                     // Sort by date descending
pagination[page]=1&pagination[pageSize]=25   // Pagination
```

**Important:**
- Strapi v5 has draft/publish enabled by default
- Public API access requires enabling permissions in Strapi Admin
- See: Strapi Admin → Settings → Users & Permissions → Public role
- Enable `find` and `findOne` permissions for News, Category, Source

## Pages Using Strapi

### Home Page (src/app/page.tsx)
- Calls `getArticles(1, 13)` to fetch latest articles
- Displays featured article + 12 in grid
- Shows warning banner if Strapi unavailable

### Category Pages (src/app/category/[slug]/page.tsx)
- Calls `getArticlesByCategory(name)` to fetch category articles
- Pre-generates routes for: Technology, Business, Sports, Entertainment, Health, Science
- Graceful fallback if Strapi unavailable during build

### Article Detail Pages (src/app/article/[id]/page.tsx)
- Calls `getArticleById(documentId)` to fetch single article
- Pre-generates routes for all published articles
- Falls back to dynamic rendering if generation fails

## Configuration

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Development Workflow

1. **Start Strapi Backend**:
   ```bash
   cd D:\Projects\Strapi\strapi-news
   npm run develop
   ```

2. **Start Next.js Frontend**:
   ```bash
   cd D:\Projects\Nextjs\lazy-nextjs-news
   npm run dev
   ```

3. **Access the app**:
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin
   - Strapi API Docs: http://localhost:1337/documentation

## Error Handling

### Build Time
- If Strapi is unavailable during `npm run build`, the app uses sensible defaults
- Category routes are pre-generated using `CATEGORY_SLUGS` array
- Article routes return empty array, falling back to dynamic rendering

### Runtime
- Network errors show user-friendly messages
- Backend unavailable displays warning banner with configuration details
- API errors are logged to console for debugging

## Styling (4-Space Indentation)

All files use **4-space indentation** as configured in:
- `.eslintrc.json` - ESLint indent rules
- `prettier.config.mjs` - Prettier formatting
- `tsconfig.json` - TypeScript formatting

## Example API Usage

### Get All Articles (Paginated)
```typescript
// Returns { articles: StrapiArticle[], total: number }
const { articles, total } = await getArticles(1, 25);  // page 1, 25 per page

articles.forEach(article => {
    console.log(article.documentId);  // Use for URLs
    console.log(article.title);
    console.log(article.category?.name);
});
```

### Get Single Article
```typescript
const article = await getArticleById(documentId);

// Access properties
console.log(article.title);
console.log(article.summary);
console.log(article.publishedAt);
console.log(article.source?.name);
```

### Get Category Articles
```typescript
// Category names: Technology, Business, Sports, Entertainment, Health, Science
const { articles, total } = await getArticlesByCategory("Technology", 1, 25);

articles.forEach(a => {
    console.log(`${a.title} - ${a.category?.name}`);
});
```

### Search Articles
```typescript
const { articles, total } = await searchArticles("AI", 1, 10);

// Searches title and summary fields (case-insensitive)
articles.forEach(a => {
    console.log(`Found: ${a.title}`);
});
```

### Get Articles by Date Range
```typescript
const startDate = "2026-02-01T00:00:00Z";
const endDate = "2026-02-28T23:59:59Z";

const { articles } = await getArticlesByDateRange(
    startDate,
    endDate,
    1,  // page
    25  // pageSize
);
```

### Get Trending Articles
```typescript
// Latest 10 articles sorted by publishedAt descending
const articles = await getTrendingArticles(10);
```

### Get All Categories
```typescript
const categories = await getCategories();

categories.forEach(cat => {
    console.log(cat.name);  // Technology, Business, etc.
});
```

### Get All Sources
```typescript
const sources = await getSources();

sources.forEach(src => {
    console.log(`${src.name}: ${src.url}`);
});
```

## Testing the Integration

1. **Verify API is accessible**:
   ```bash
   curl http://localhost:1337/api/news
   ```

2. **Build the frontend**:
   ```bash
   npm run build
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Test pages**:
   - http://localhost:3000 - Home page with featured article
   - http://localhost:3000/category/technology - Technology articles
   - http://localhost:3000/article/[documentId] - Article detail

## Debugging

### Enable API Logging
Add console logs to `src/lib/api.ts` functions:

```typescript
console.log(`Fetching from: ${API_BASE_URL}/news?${params}`);
```

### Check Network Requests
Use browser DevTools → Network tab to inspect API calls:
- Look for requests to http://localhost:1337/api/*
- Check response status and payload

### Verify Data Structure
Log the raw Strapi response:

```typescript
console.log("Strapi response:", data);
```

## Migration from Mock Data

The project initially used static mock data (`src/lib/data.ts`). This has been replaced with Strapi API calls, but the mock data file is retained as a fallback.

To use mock data instead:
1. Import from `src/lib/data.ts` instead of `src/lib/api.ts`
2. Remove Strapi environment variables
3. Skip the data conversion step

## Related Projects

- **Strapi Backend**: D:\Projects\Strapi\strapi-news
- **Frontend**: D:\Projects\Nextjs\lazy-nextjs-news

See `CLAUDE.md` in each project for detailed documentation.
