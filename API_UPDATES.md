# API Updates for Strapi v5 Compatibility

## Overview

The `src/lib/api.ts` file has been updated to correctly match the **Strapi v5** backend schema and API endpoints as documented in `D:\Projects\Strapi\strapi-news\CLAUDE.md`.

## Key Changes

### 1. Endpoint Changes

**Before (v4 style):**
```
GET /api/news                    # Article listing
GET /api/categories              # Category listing
GET /api/sources                 # Source listing
```

**After (v5 correct):**
```
GET /api/news-articles           # Article listing (plural endpoint)
GET /api/categories              # Category listing (same)
GET /api/sources                 # Source listing (same)
```

### 2. Populate Parameter

**Before:**
```typescript
"populate": "category,source"    // Specific relationships
```

**After:**
```typescript
"populate": "*"                  // All relationships (Strapi v5 standard)
```

### 3. Published Content Filter

**Added:**
```typescript
"filters[publishedAt][$notNull]": "true"   // Only published articles
```

Strapi v5 has draft/publish enabled by default. This filter ensures we only fetch published content.

### 4. Category Filtering

**Updated to use exact name matching:**
```typescript
"filters[category][name][$eq]": categoryName    // Exact match by name
```

This allows filtering articles by category name (e.g., "Technology").

### 5. New Functions Added

```typescript
getArticlesBySource(sourceName, page, pageSize)    // Filter by source name
getCategoryById(documentId)                        // Get single category
getSourceById(documentId)                          // Get single source
getArticlesByDateRange(startDate, endDate, page, pageSize)  // Date range filter
```

### 6. API Token Support

The API client now includes optional API token support:

```typescript
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

function createHeaders() {
    const headers = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
        headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    return headers;
}
```

Use environment variable `STRAPI_API_TOKEN` for authenticated requests (optional).

### 7. Response Handling

**Null-safe response extraction:**
```typescript
articles: data.data || [],                           // Default to empty array
total: data.meta?.pagination?.total || 0,          // Safe access with fallback
```

This prevents errors when Strapi returns empty data sets.

## Testing the Updated API

### 1. Verify Strapi is Running

```bash
curl http://localhost:1337/api/news-articles
```

Should return:
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

### 2. Enable Public API Access

If you get 403 Forbidden, enable public permissions:

1. Go to Strapi Admin: http://localhost:1337/admin
2. Settings → Users & Permissions plugin → Roles → Public
3. Check `find` and `findOne` for:
   - News articles
   - Categories
   - Sources
4. Click Save

### 3. Import Sample Data

```bash
cd D:\Projects\Strapi\strapi-news
npm run import-data
```

This creates 30+ sample articles that will be available via the API.

### 4. Test with Sample Calls

```typescript
// Get articles
const { articles } = await getArticles(1, 10);
console.log(articles.length);  // Should be > 0

// Get by category
const techArticles = await getArticlesByCategory("Technology");
console.log(techArticles.articles.length);

// Search
const results = await searchArticles("AI");
console.log(results.articles.length);
```

## File Structure Reference

```
src/lib/api.ts
├── STRAPI_URL config
├── createHeaders() helper
├── Type definitions
│   ├── StrapiArticle
│   ├── StrapiCategory
│   └── StrapiSource
├── Response wrapper types
│   ├── StrapiResponse<T>
│   └── StrapiSingleResponse<T>
└── Export functions (13 total)
    ├── getArticles()
    ├── getArticleById()
    ├── getArticlesByCategory()
    ├── getArticlesBySource()
    ├── getCategories()
    ├── getCategoryById()
    ├── getSources()
    ├── getSourceById()
    ├── getTrendingArticles()
    ├── searchArticles()
    └── getArticlesByDateRange()
```

## Compatibility Notes

### Strapi v5 Requirements

- Draft/Publish workflow enabled by default
- Public role has no permissions by default
- Must explicitly enable permissions for public API access
- documentId used for accessing records in URLs/queries (not ID)

### Next.js Frontend Integration

- All functions use `async/await` for promise handling
- Graceful error handling with try/catch blocks
- Safe null-coalescing for response data
- 4-space indentation (TypeScript + Prettier formatted)

### Database Types

Strapi v5 returns ISO 8601 formatted dates:
```
publishedAt: "2026-02-15T14:30:00.000Z"
```

Convert to display format:
```typescript
new Date(article.publishedAt).toLocaleDateString()  // 2/15/2026
```

## Migration from Previous Version

If updating from an earlier version:

1. **Replace** entire `src/lib/api.ts` with new version
2. **Verify** imports in pages still work (function names are the same)
3. **Test** data transformation in `convertStrapiToArticle()` function
4. **Update** environment variables if using API tokens
5. **Rebuild** and test: `npm run build && npm run dev`

## Next Steps

- Monitor API logs in Strapi Admin: Dashboard → Logs
- Set up error tracking for failed API calls
- Consider implementing response caching with React Query or SWR
- Plan for authentication if adding user-specific content later

## References

- **Strapi Docs**: https://docs.strapi.io
- **Strapi v5 REST API**: http://localhost:1337/documentation
- **Frontend Integration**: See `STRAPI_INTEGRATION.md`
- **Backend CLAUDE.md**: `D:\Projects\Strapi\strapi-news\CLAUDE.md`
