# PMC News - Product Requirements Document (PRD)

> **How to use this file**: Each feature has a status tag. Change it to tell Claude what to build next.
>
> - `[TODO]` — Not started. Claude should build this when asked.
> - `[IN PROGRESS]` — Currently being worked on.
> - `[DONE]` — Complete. No changes needed.
> - `[SKIP]` — Intentionally skipped. Claude should ignore this.
>
> **To request work**, just say: _"Build all TODO features"_ or _"Build feature 3.2"_.

---

## 1. Project Summary

**PMC News** is a news aggregator website built with Next.js 15 + TypeScript + Tailwind CSS v4. It pulls articles from a Strapi headless CMS backend and displays them in a clean, responsive, dark-mode-supported interface.

**Live Stack**: Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn/ui · Strapi v5 REST API

**Backend**: `D:\Projects\Strapi\strapi-news` — Strapi v5 with automated news fetcher pipeline (17 RSS sources, 11 categories, ~170 articles/day)

**Backend PRD**: `D:\Projects\Strapi\strapi-news\PRD.md`

**Content Pipeline**: RSS fetch → full-text scrape → `raw_content` → AI summarization → `content` (displayed to users)

---

## 2. Current State (What's Already Built)

### 2.1 Pages `[DONE]`

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Featured article + latest news grid (13 articles from Strapi) |
| Category | `/category/[slug]` | Filtered articles by category (up to 25). 11 categories: Technology, Business, Sports, Entertainment, Health, Science, World, Politics, Education, Environment, Finance |
| Article | `/article/[id]` | Full article detail with back button, metadata, body |

### 2.2 Core Components `[DONE]`

| Component | Type | Description |
|-----------|------|-------------|
| `Header` | Client | Sticky nav bar, category links, theme toggle (Sun/Moon) |
| `MobileNav` | Client | Hamburger menu → Sheet drawer (slides from left) |
| `NewsCard` | Server | Article card with featured variant, placeholder image |
| `Footer` | Server | Copyright year + credit line |
| `ThemeProvider` | Client | next-themes wrapper for dark/light mode |

### 2.3 API Client `[DONE]`

All Strapi API functions are implemented in `src/lib/api.ts`:

| Function | Status |
|----------|--------|
| `getArticles()` | Used on home page |
| `getArticleById()` | Used on article page |
| `getArticlesByCategory()` | Used on category page |
| `getCategories()` | **Built but unused** |
| `getSources()` | **Built but unused** |
| `getTrendingArticles()` | **Built but unused** |
| `searchArticles()` | **Built but unused** |
| `getArticlesByDateRange()` | **Built but unused** |
| `getArticlesBySource()` | **Built but unused** |

### 2.4 Working Features `[DONE]`

- Dark/light mode toggle with system default detection
- Responsive layout (1-col mobile, 2-col tablet, 3-col desktop)
- Sticky header with active nav state
- Mobile hamburger menu
- SEO metadata on category + article pages
- Graceful error handling when Strapi is down
- `generateStaticParams` on all dynamic routes

---

## 3. Features To Build

### 3.1 Fix: Install Typography Plugin `[DONE]`

**Priority**: High
**Why**: Article page uses `prose` classes but `@tailwindcss/typography` is not installed — article body has no styling.

**Requirements**:
- Install `@tailwindcss/typography`
- Import it in CSS/config so `prose` classes work
- Verify article body text renders with proper paragraph spacing, headings, links

---

### 3.2 Fix: Extract Shared `convertStrapiToArticle` Utility `[DONE]`

**Priority**: Medium
**Why**: Same function is copy-pasted in `page.tsx` and `category/[slug]/page.tsx`.

**Requirements**:
- Move `convertStrapiToArticle()` to `src/lib/api.ts` (or a new `src/lib/transforms.ts`)
- Import it in both pages
- No behavior change

---

### 3.3 Dynamic Navigation from Strapi `[DONE]`

**Priority**: Medium
**Why**: Header/MobileNav categories are hardcoded in `data.ts`. New Strapi categories won't appear.

**Requirements**:
- Fetch categories from Strapi using `getCategories()` at build time or runtime
- Fall back to hardcoded list if Strapi is unavailable
- Update Header and MobileNav to use fetched categories
- Remove hardcoded `CATEGORY_SLUGS` validation in category page (validate against fetched list instead)

---

### 3.4 Search Feature `[DONE]`

**Priority**: Medium
**Why**: `searchArticles()` API function exists but has no UI.

**Requirements**:
- Add a search icon/button in the Header
- Create a search page at `/search` or `/search?q=query`
- Search input with submit (Enter key or button)
- Display results as a grid of `NewsCard` components
- Show "No results found" for empty results
- Show loading state while searching
- Mobile-friendly search UI

---

### 3.5 Pagination `[TODO]`

**Priority**: High
**Why**: Backend now fetches ~170 articles/day from 17 RSS sources across 11 categories. Home shows only 13 articles, category shows 25. Without pagination, 85%+ of content is unreachable. Strapi API has `maxLimit: 100` per page with built-in pagination metadata.

**Requirements**:
- Add "Load More" button or numbered pagination at bottom of article grids
- Works on: Home page, Category pages, Search results
- Use the `page` and `pageSize` params already supported by the API
- Show total count from Strapi response `meta.pagination` (total, pageCount)
- Handle Strapi's `maxLimit: 100` — use reasonable `pageSize` (e.g., 25)

---

### 3.6 Real Images `[DONE]`

**Priority**: High
**Why**: Every card shows a grey placeholder box. No actual images displayed.

**Requirements**:
- If Strapi article has an image URL, display it using Next.js `<Image>` component
- If no image, keep a styled fallback placeholder (current grey box is fine)
- Configure `next.config.ts` with allowed image domains (Strapi host)
- Optimize with proper `width`, `height`, `sizes` props
- Featured card should have a larger image

---

### 3.7 Article Page: "Read Original" Link `[TODO]`

**Priority**: Low
**Why**: Strapi articles have a `url` field (original source URL) that is never shown.

**Requirements**:
- If `article.url` exists, show a "Read Original Article" link/button
- Opens in new tab (`target="_blank"`)
- Place it near the article title or at the bottom of the article

---

### 3.8 Article Page: Source Link `[TODO]`

**Priority**: Low
**Why**: Source/author name is shown as plain text. Sources have URLs in Strapi.

**Requirements**:
- If source has a URL, make the author/source name a clickable link
- Opens in new tab
- Style as a subtle link (underline on hover)

---

### 3.9 Related Articles Section `[TODO]`

**Priority**: Low
**Why**: Article page ends abruptly. No way to discover more content.

**Requirements**:
- At the bottom of each article page, show 3-4 articles from the same category
- Use `getArticlesByCategory()` excluding the current article
- Display as a horizontal row of `NewsCard` components
- Title: "More in [Category]" or "Related Articles"

---

### 3.10 Reading Time `[TODO]`

**Priority**: Low
**Why**: Nice UX touch for a news site.

**Requirements**:
- Calculate reading time from article content (assume ~200 words/minute)
- Display on `NewsCard` and article detail page
- Format: "X min read"

---

### 3.11 Trending/Latest Sidebar or Section `[TODO]`

**Priority**: Low
**Why**: `getTrendingArticles()` API exists but is unused.

**Requirements**:
- Add a "Trending" or "Latest" section on the home page
- Could be a sidebar on desktop, stacked section on mobile
- Show 5-10 articles as compact list items (title + date only)
- Use `getTrendingArticles()` API function

---

### 3.12 Loading States & Skeletons `[TODO]`

**Priority**: Medium
**Why**: Pages show nothing while data loads (Server Components). Better UX with loading indicators.

**Requirements**:
- Add `loading.tsx` files for each route (Next.js convention)
- Show skeleton cards matching the layout of the actual content
- Use shadcn/ui Skeleton component (install if needed: `npx shadcn@latest add skeleton`)
- Skeleton for: home page grid, category grid, article detail

---

### 3.13 Clean Up Dead Mock Data `[TODO]`

**Priority**: Low
**Why**: `data.ts` has 25 unused mock articles. Only the `categories` array and `Article` type are used.

**Requirements**:
- Keep: `Article` interface, `categories` array
- Remove: All 25 mock article objects and the unused helper functions (`getArticlesByCategory`, `getArticleById`, `getFeaturedArticle`, `getLatestArticles`)
- Or move `Article` type to a `types.ts` file and delete `data.ts` entirely if categories become dynamic (see 3.3)

---

### 3.14 Bookmark / Save Articles `[SKIP]`

**Priority**: Future
**Why**: Requires client-side state or user accounts. Out of scope for now.

---

### 3.15 Comments System `[SKIP]`

**Priority**: Future
**Why**: Requires user authentication. Out of scope for now.

---

### 3.16 RSS Feed `[TODO]`

**Priority**: Low
**Why**: Standard feature for news sites. Good for SEO and subscribers.

**Requirements**:
- Create a route handler at `/feed.xml` or `/rss` (using Next.js Route Handlers)
- Include latest 20-50 articles
- Standard RSS 2.0 format with title, description, link, pubDate
- Add `<link rel="alternate" type="application/rss+xml">` to layout head

---

### 3.17 Newsletter Signup `[SKIP]`

**Priority**: Future
**Why**: Requires email service integration. Out of scope for now.

---

### 3.18 Social Sharing `[TODO]`

**Priority**: Low
**Why**: Users should be able to share articles.

**Requirements**:
- Add share buttons on article detail page (Twitter/X, Facebook, LinkedIn, Copy Link)
- Use native share URLs (no third-party SDKs)
- Optional: Use `navigator.share()` API on mobile for native share sheet
- Place near the article title or at the bottom

---

### 3.19 SEO: Open Graph & Structured Data `[TODO]`

**Priority**: High
**Why**: Artikel yang di-share di social media tidak punya preview image/description. Google juga belum bisa index artikel dengan baik tanpa structured data.

**Requirements**:
- Add Open Graph meta tags (og:title, og:description, og:image, og:type) di article page
- Add Twitter Card meta tags (twitter:card, twitter:title, twitter:image)
- Add JSON-LD structured data (NewsArticle schema) di article page
- Dynamic og:image dari article image field
- Fallback ke default PMC News image kalau artikel tidak punya image

---

### 3.20 Sitemap.xml `[TODO]`

**Priority**: High
**Why**: Google perlu sitemap untuk discover dan index semua artikel.

**Requirements**:
- Generate `/sitemap.xml` menggunakan Next.js `sitemap.ts` convention
- Include semua artikel dan category pages
- Update otomatis saat ada artikel baru
- Add sitemap reference di `robots.txt`

---

### 3.21 Homepage Redesign: Breaking News + Category Sections `[TODO]`

**Priority**: Medium
**Why**: Homepage sekarang hanya grid artikel tanpa struktur. Dengan 11 kategori dan ~170 artikel/hari, homepage perlu struktur yang lebih baik untuk showcase konten dari semua kategori.

**Requirements**:
- Breaking/Featured news section di atas (1-2 artikel besar)
- Section per kategori (11 total): Technology, Business, Sports, Entertainment, Health, Science, World, Politics, Education, Environment, Finance — masing-masing 3-4 artikel
- "See all" link ke category page
- Responsive: stack di mobile, grid di desktop
- Consider grouping related categories (e.g., Education + Science, Environment + Health) to avoid overly long page

---

### 3.22 Article Page: Publish Date & Source Badge `[TODO]`

**Priority**: Medium
**Why**: Artikel sekarang tidak menampilkan tanggal publish dan sumber dengan jelas. Untuk news site, timestamp sangat penting.

**Requirements**:
- Tampilkan tanggal publish dalam format relative ("2 hours ago") dan absolute ("March 31, 2026")
- Source badge/chip (misal: "BBC World", "Al Jazeera") yang bisa diklik ke source page
- Author name di bawah judul
- Reading time di samping tanggal

---

### 3.23 Dark Mode Image Handling `[TODO]`

**Priority**: Low
**Why**: Beberapa article image punya background putih yang terlihat jarring di dark mode.

**Requirements**:
- Add subtle border/rounded corners pada article images
- Slightly reduce brightness di dark mode (`dark:brightness-90`)
- Placeholder image yang sesuai dark/light mode

---

### 3.24 Error & Empty States `[TODO]`

**Priority**: Medium
**Why**: Halaman category kosong atau error hanya menampilkan teks minimal. Perlu UX yang lebih baik.

**Requirements**:
- Category page tanpa artikel: tampilkan ilustrasi + "No articles in this category yet"
- Search tanpa hasil: tampilkan suggestions atau trending articles
- Network error: retry button + informative message
- 404 page: custom design dengan navigasi kembali

---

### 3.25 Source Page `[TODO]`

**Priority**: Low
**Why**: Backend has 17 news sources with metadata (name, URL, description). `getSources()` and `getArticlesBySource()` API functions already exist but are unused. Showing articles by source gives users another way to browse content.

**Requirements**:
- Create `/source/[name]` page showing articles from a specific source
- Source list page at `/sources` showing all 17 sources with article counts
- Use existing `getSources()` and `getArticlesBySource()` API functions
- Each source card: name, description, article count, link to source page

**Backend dependency**: Strapi backend feature 3.5 (Category/Source counts API) would improve this.

---

### 3.26 Content Quality Indicator `[TODO]`

**Priority**: Low
**Why**: Backend pipeline produces two types of content: AI-summarized (`content`) and raw scraped (`raw_content`). Some articles may only have RSS summary. Showing content quality helps users know what to expect.

**Requirements**:
- If article has AI-summarized content, show "AI Summary" badge
- If article only has RSS summary (short), indicate accordingly
- Optional: show "Read Original" link more prominently for summary-only articles

**Backend dependency**: Relies on `content` field being populated by backend auto-summarization (Backend PRD 3.20).

---

## 4. Non-Functional Requirements

### 4.1 Performance `[DONE]`
- Static generation for all known routes
- Minimal client-side JavaScript
- No client-side data fetching on initial load

### 4.2 SEO `[DONE]` (partial)
- Dynamic metadata on category and article pages
- Missing: Home page metadata, Open Graph tags, structured data (JSON-LD)

### 4.3 Accessibility `[TODO]`
- Ensure proper heading hierarchy (h1 → h2 → h3)
- All interactive elements keyboard accessible
- ARIA labels on icon-only buttons (theme toggle, hamburger menu)
- Color contrast meets WCAG AA

### 4.4 Code Quality
- TypeScript strict mode — no `any` types
- 4-space indentation, double quotes, semicolons
- Server Components by default, Client Components only when needed
- `@/` import alias for all internal imports

---

## 5. Priority Order (Suggested Build Sequence)

### Already Done
| Feature | Status |
|---------|--------|
| 3.1 Typography Plugin | DONE |
| 3.2 Extract Shared Utility | DONE |
| 3.3 Dynamic Navigation | DONE |
| 3.4 Search Feature | DONE |
| 3.6 Real Images | DONE |

### Next Up
| Order | Feature | Priority | Notes |
|-------|---------|----------|-------|
| 1 | 3.19 SEO: Open Graph & Structured Data | High | |
| 2 | 3.20 Sitemap.xml | High | |
| 3 | 3.5 Pagination | High | ~170 articles/day, most content unreachable without this |
| 4 | 3.22 Article Page: Date & Source Badge | Medium | |
| 5 | 3.12 Loading Skeletons | Medium | |
| 6 | 3.21 Homepage Redesign | Medium | Now 11 categories to showcase |
| 7 | 3.7 Read Original Link | Medium | |
| 8 | 3.24 Error & Empty States | Medium | |
| 9 | 3.9 Related Articles | Low | |
| 10 | 3.10 Reading Time | Low | |
| 11 | 3.8 Source Link | Low | |
| 12 | 3.11 Trending Section | Low | |
| 13 | 3.25 Source Page | Low | Backend has 17 sources with metadata |
| 14 | 3.18 Social Sharing | Low | |
| 15 | 3.16 RSS Feed | Low | |
| 16 | 3.26 Content Quality Indicator | Low | Depends on backend auto-summarization |
| 17 | 3.13 Clean Up Dead Code | Low | |
| 18 | 3.23 Dark Mode Image Handling | Low | |
| 19 | 4.3 Accessibility | Ongoing | |

---

## 6. Backend Dependencies (Strapi PRD Cross-Reference)

| Frontend Feature | Backend Feature Needed | Backend Status |
|-----------------|----------------------|----------------|
| 3.5 Pagination | Strapi pagination API (`meta.pagination`) | DONE (built-in) |
| 3.21 Homepage Redesign | 11 categories available via API | DONE |
| 3.22 Date & Source Badge | Source relation in API | DONE |
| 3.25 Source Page | Backend 3.5 Category/Source counts API | TODO |
| 3.26 Content Quality | Backend 3.20 Auto-Summarization | TODO |
| 3.7 Read Original Link | `url` field in articles | DONE |
| 3.9 Related Articles | Category-filtered API | DONE |

### Backend Features That Improve Frontend (No Blocking)
| Backend Feature | Impact on Frontend |
|----------------|-------------------|
| Backend 3.19 Automated Scheduling | Fresh content daily without manual intervention |
| Backend 3.20 Auto-Summarization | Better `content` field quality (AI summaries vs RSS snippets) |
| Backend 3.21 Category `slug` field | More robust dynamic navigation (currently derives slug from name) |
| Backend 3.22 Image Scraping | Real article images instead of placeholders |
| Backend 3.23 Deduplication | Fewer duplicate articles across sources |

---

## 7. Quick Reference: How to Ask Claude to Build

```
"Build feature 3.1"           → Install typography plugin
"Build all High priority"     → Build 3.1 and 3.6
"Build features 3.2 to 3.5"  → Build those four features
"Build all TODO features"     → Build everything marked [TODO]
"What's left to build?"       → Claude reads this file and lists remaining [TODO] items
```

After Claude completes a feature, it will update the status tag from `[TODO]` to `[DONE]`.
