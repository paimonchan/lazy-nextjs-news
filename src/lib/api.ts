/**
 * Strapi v5 API Client
 * Handles all API calls to the Strapi backend
 * Endpoints: /api/news-articles, /api/categories, /api/sources
 * Reference: D:\Projects\Strapi\strapi-news\CLAUDE.md
 */

const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_BASE_URL = `${STRAPI_URL}/api`;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

function createHeaders() {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (STRAPI_API_TOKEN) {
        headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    return headers;
}

/**
 * Strapi Article Response Type (v5)
 * From Strapi with documentId support
 */
export interface StrapiArticle {
    id: number;
    documentId: string;
    title: string;
    summary: string;
    url: string;
    content?: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    category?: {
        id: number;
        documentId: string;
        name: string;
    };
    source?: {
        id: number;
        documentId: string;
        name: string;
        url: string;
        description?: string;
    };
}

/**
 * Strapi Category Response Type (v5)
 */
export interface StrapiCategory {
    id: number;
    documentId: string;
    name: string;
}

/**
 * Strapi Source Response Type (v5)
 */
export interface StrapiSource {
    id: number;
    documentId: string;
    name: string;
    url: string;
    description?: string;
}

/**
 * Strapi v5 Response Wrapper for Collections
 */
interface StrapiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

/**
 * Strapi v5 Response Wrapper for Single Items
 */
interface StrapiSingleResponse<T> {
    data: T;
    meta?: Record<string, unknown>;
}

/**
 * Fetch all published news articles with pagination
 * Endpoint: GET /api/news-articles
 * Filters: published articles only (publishedAt is not null)
 * Populate: all relationships (*, category, source)
 * Sort: by publishedAt descending
 */
export async function getArticles(
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    try {
        const params = new URLSearchParams({
            "pagination[page]": page.toString(),
            "pagination[pageSize]": pageSize.toString(),
            populate: "*",
            "sort[0]": "publishedAt:desc",
            "filters[publishedAt][$notNull]": "true",
        });

        const response = await fetch(
            `${API_BASE_URL}/news-articles?${params}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = (await response.json()) as StrapiResponse<StrapiArticle>;
        return {
            articles: data.data || [],
            total: data.meta?.pagination?.total || 0,
        };
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
}

/**
 * Fetch single article by documentId
 * Endpoint: GET /api/news-articles/:documentId
 * Populate: all relationships
 */
export async function getArticleById(
    documentId: string
): Promise<StrapiArticle> {
    try {
        const params = new URLSearchParams({
            populate: "*",
        });

        const response = await fetch(
            `${API_BASE_URL}/news-articles/${documentId}?${params}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch article: ${response.statusText}`);
        }

        const data =
            (await response.json()) as StrapiSingleResponse<StrapiArticle>;
        return data.data;
    } catch (error) {
        console.error(`Error fetching article ${documentId}:`, error);
        throw error;
    }
}

/**
 * Fetch articles filtered by category name
 * Endpoint: GET /api/news-articles?filters[category][name][$eq]=Technology
 * Note: Filters by category name using $eq operator for exact match
 */
export async function getArticlesByCategory(
    categoryName: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    try {
        const params = new URLSearchParams({
            "filters[category][name][$eq]": categoryName,
            "pagination[page]": page.toString(),
            "pagination[pageSize]": pageSize.toString(),
            populate: "*",
            "sort[0]": "publishedAt:desc",
            "filters[publishedAt][$notNull]": "true",
        });

        const response = await fetch(
            `${API_BASE_URL}/news-articles?${params}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch articles by category: ${response.statusText}`
            );
        }

        const data = (await response.json()) as StrapiResponse<StrapiArticle>;
        return {
            articles: data.data || [],
            total: data.meta?.pagination?.total || 0,
        };
    } catch (error) {
        console.error(
            `Error fetching articles for category ${categoryName}:`,
            error
        );
        throw error;
    }
}

/**
 * Fetch articles filtered by source name
 * Endpoint: GET /api/news-articles?filters[source][name][$eq]=TechCrunch
 * Note: Filters by source name using $eq operator for exact match
 */
export async function getArticlesBySource(
    sourceName: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    try {
        const params = new URLSearchParams({
            "filters[source][name][$eq]": sourceName,
            "pagination[page]": page.toString(),
            "pagination[pageSize]": pageSize.toString(),
            populate: "*",
            "sort[0]": "publishedAt:desc",
            "filters[publishedAt][$notNull]": "true",
        });

        const response = await fetch(
            `${API_BASE_URL}/news-articles?${params}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch articles by source: ${response.statusText}`
            );
        }

        const data = (await response.json()) as StrapiResponse<StrapiArticle>;
        return {
            articles: data.data || [],
            total: data.meta?.pagination?.total || 0,
        };
    } catch (error) {
        console.error(
            `Error fetching articles for source ${sourceName}:`,
            error
        );
        throw error;
    }
}

/**
 * Fetch all published categories
 * Endpoint: GET /api/categories
 * Sort: by name ascending
 */
export async function getCategories(): Promise<StrapiCategory[]> {
    try {
        const params = new URLSearchParams({
            "pagination[limit]": "100",
            "sort[0]": "name:asc",
        });

        const response = await fetch(`${API_BASE_URL}/categories?${params}`, {
            headers: createHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch categories: ${response.statusText}`
            );
        }

        const data = (await response.json()) as StrapiResponse<StrapiCategory>;
        return data.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

/**
 * Fetch single category by documentId
 * Endpoint: GET /api/categories/:documentId
 */
export async function getCategoryById(
    documentId: string
): Promise<StrapiCategory> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/categories/${documentId}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch category: ${response.statusText}`);
        }

        const data =
            (await response.json()) as StrapiSingleResponse<StrapiCategory>;
        return data.data;
    } catch (error) {
        console.error(`Error fetching category ${documentId}:`, error);
        throw error;
    }
}

/**
 * Fetch all published sources
 * Endpoint: GET /api/sources
 * Sort: by name ascending
 */
export async function getSources(): Promise<StrapiSource[]> {
    try {
        const params = new URLSearchParams({
            "pagination[limit]": "100",
            "sort[0]": "name:asc",
        });

        const response = await fetch(`${API_BASE_URL}/sources?${params}`, {
            headers: createHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sources: ${response.statusText}`);
        }

        const data = (await response.json()) as StrapiResponse<StrapiSource>;
        return data.data || [];
    } catch (error) {
        console.error("Error fetching sources:", error);
        throw error;
    }
}

/**
 * Fetch single source by documentId
 * Endpoint: GET /api/sources/:documentId
 */
export async function getSourceById(documentId: string): Promise<StrapiSource> {
    try {
        const response = await fetch(`${API_BASE_URL}/sources/${documentId}`, {
            headers: createHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch source: ${response.statusText}`);
        }

        const data =
            (await response.json()) as StrapiSingleResponse<StrapiSource>;
        return data.data;
    } catch (error) {
        console.error(`Error fetching source ${documentId}:`, error);
        throw error;
    }
}

/**
 * Fetch trending articles (latest published)
 * Endpoint: GET /api/news-articles?sort[0]=publishedAt:desc&pagination[limit]=10
 * Limit: returns only latest articles
 */
export async function getTrendingArticles(
    limit: number = 10
): Promise<StrapiArticle[]> {
    try {
        const params = new URLSearchParams({
            "pagination[limit]": limit.toString(),
            populate: "*",
            "sort[0]": "publishedAt:desc",
            "filters[publishedAt][$notNull]": "true",
        });

        const response = await fetch(
            `${API_BASE_URL}/news-articles?${params}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch trending articles: ${response.statusText}`
            );
        }

        const data = (await response.json()) as StrapiResponse<StrapiArticle>;
        return data.data || [];
    } catch (error) {
        console.error("Error fetching trending articles:", error);
        throw error;
    }
}

/**
 * Search articles by title or summary
 * Endpoint: GET /api/news-articles?filters[$or][0][title][$containsi]=query&filters[$or][1][summary][$containsi]=query
 * Note: Uses $containsi for case-insensitive substring matching
 */
export async function searchArticles(
    query: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    try {
        const params = new URLSearchParams({
            "filters[$or][0][title][$containsi]": query,
            "filters[$or][1][summary][$containsi]": query,
            "pagination[page]": page.toString(),
            "pagination[pageSize]": pageSize.toString(),
            populate: "*",
            "sort[0]": "publishedAt:desc",
            "filters[publishedAt][$notNull]": "true",
        });

        const response = await fetch(
            `${API_BASE_URL}/news-articles?${params}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to search articles: ${response.statusText}`
            );
        }

        const data = (await response.json()) as StrapiResponse<StrapiArticle>;
        return {
            articles: data.data || [],
            total: data.meta?.pagination?.total || 0,
        };
    } catch (error) {
        console.error(`Error searching articles for "${query}":`, error);
        throw error;
    }
}

/**
 * Fetch articles published within a date range
 * Endpoint: GET /api/news-articles?filters[publishedAt][$gte]=startDate&filters[publishedAt][$lte]=endDate
 * Note: Uses ISO 8601 date format (e.g., "2026-02-15T00:00:00Z")
 */
export async function getArticlesByDateRange(
    startDate: string,
    endDate: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    try {
        const params = new URLSearchParams({
            "filters[publishedAt][$gte]": startDate,
            "filters[publishedAt][$lte]": endDate,
            "pagination[page]": page.toString(),
            "pagination[pageSize]": pageSize.toString(),
            populate: "*",
            "sort[0]": "publishedAt:desc",
        });

        const response = await fetch(
            `${API_BASE_URL}/news-articles?${params}`,
            {
                headers: createHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch articles by date range: ${response.statusText}`
            );
        }

        const data = (await response.json()) as StrapiResponse<StrapiArticle>;
        return {
            articles: data.data || [],
            total: data.meta?.pagination?.total || 0,
        };
    } catch (error) {
        console.error(
            `Error fetching articles from ${startDate} to ${endDate}:`,
            error
        );
        throw error;
    }
}
