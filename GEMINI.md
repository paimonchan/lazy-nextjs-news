# Lazy Next.js News - Modern News Website

## Project Overview

Lazy Next.js News (internally referred to as NewsWire in `CLAUDE.md`) is a modern news website built with Next.js 15, featuring dark mode support, mobile-responsive design, and static site generation. The site displays mock news articles across multiple categories with a clean, professional interface. The "lazy" in its name might also imply optimized loading strategies for content.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **UI Components**: shadcn/ui (New York style)
-   **Fonts**: Geist Sans & Geist Mono
-   **Theme Management**: `next-themes`
-   **Data**: Static mock data (no external API)

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
    ├── data.ts                 # Mock news data and helper functions
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

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Mobile: Hamburger menu, single-column layout
- Tablet: 2-column grid for articles
- Desktop: 3-column grid, horizontal navigation

### Static Site Generation (SSG)
- All routes pre-rendered at build time for optimal performance.
- `generateStaticParams()` used for dynamic routes like `/category/[slug]` and `/article/[id]`.
- All mock articles and category pages are generated statically.

## Getting Started

### Installation
To set up the project locally, follow these steps:

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd lazy-nextjs-news
    ```
2.  Install dependencies using your preferred package manager:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Development Server
To run the application in development mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000). Pages auto-update on changes.

## Development Commands

-   `npm run dev`: Starts the development server.
-   `npm run build`: Creates a production build with static generation.
-   `npm run start`: Starts the production server using the pre-built output.
-   `npm run lint`: Runs ESLint for code quality checks.

## Code Conventions & Best Practices

-   **TypeScript Type Safety**: Maintain strict typing, avoid `any`.
-   **Formatting**: 4 spaces indentation, semicolons required, double quotes, ES5 trailing commas.
-   **Styling**: Primarily use Tailwind utility classes and the `cn()` utility for merging.
-   **Components**: Default to Server Components, mark Client Components with `"use client"`. Use async Server Components for data fetching.
-   **Routing**: Leverage Next.js App Router with file-based routing and dynamic parameters.
-   **Import Aliases**: Use `@/` for `src/` to maintain clean imports.
-   **Performance**: Prioritize static generation, optimize images, and minimize client-side JavaScript.

## Gemini CLI Usage

The Gemini CLI can be a powerful tool for interacting with and developing this project. Here are some ways to leverage it:

-   **Codebase Investigation**: Use `codebase_investigator` to understand module dependencies, component usage, or architectural patterns.
-   **File Operations**: Utilize `read_file` to inspect code, `replace` for targeted modifications, and `write_file` for creating new files or extensive changes.
-   **Command Execution**: Run development commands like `npm run dev`, `npm run build`, or `npm run lint` using `run_shell_command`.
-   **Code Search**: Employ `grep_search` to find specific patterns, function usages, or text across the project files.
-   **Task Management**: Use `write_todos` to break down complex features or fixes into manageable steps and track progress.
