import { API_BASE_URL, createHeaders } from "@/infrastructure/strapi/client";
import type {
    StrapiArticle,
    StrapiResponse,
    StrapiSingleResponse,
} from "@/infrastructure/strapi/types";

export async function getArticles(
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    const params = new URLSearchParams({
        "pagination[page]": page.toString(),
        "pagination[pageSize]": pageSize.toString(),
        populate: "*",
        "sort[0]": "publishedAt:desc",
        "filters[publishedAt][$notNull]": "true",
    });

    const response = await fetch(`${API_BASE_URL}/news-articles?${params}`, {
        headers: createHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data = (await response.json()) as StrapiResponse<StrapiArticle>;
    return {
        articles: data.data || [],
        total: data.meta?.pagination?.total || 0,
    };
}

export async function getArticleById(
    documentId: string
): Promise<StrapiArticle> {
    const params = new URLSearchParams({ populate: "*" });

    const response = await fetch(
        `${API_BASE_URL}/news-articles/${documentId}?${params}`,
        { headers: createHeaders() }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    const data =
        (await response.json()) as StrapiSingleResponse<StrapiArticle>;
    return data.data;
}

export async function getArticlesByCategory(
    categoryName: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    const params = new URLSearchParams({
        "filters[category][name][$eq]": categoryName,
        "pagination[page]": page.toString(),
        "pagination[pageSize]": pageSize.toString(),
        populate: "*",
        "sort[0]": "publishedAt:desc",
        "filters[publishedAt][$notNull]": "true",
    });

    const response = await fetch(`${API_BASE_URL}/news-articles?${params}`, {
        headers: createHeaders(),
    });

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
}

export async function getArticlesBySource(
    sourceName: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    const params = new URLSearchParams({
        "filters[source][name][$eq]": sourceName,
        "pagination[page]": page.toString(),
        "pagination[pageSize]": pageSize.toString(),
        populate: "*",
        "sort[0]": "publishedAt:desc",
        "filters[publishedAt][$notNull]": "true",
    });

    const response = await fetch(`${API_BASE_URL}/news-articles?${params}`, {
        headers: createHeaders(),
    });

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
}

export async function getTrendingArticles(
    limit: number = 10
): Promise<StrapiArticle[]> {
    const params = new URLSearchParams({
        "pagination[limit]": limit.toString(),
        populate: "*",
        "sort[0]": "publishedAt:desc",
        "filters[publishedAt][$notNull]": "true",
    });

    const response = await fetch(`${API_BASE_URL}/news-articles?${params}`, {
        headers: createHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch trending articles: ${response.statusText}`
        );
    }

    const data = (await response.json()) as StrapiResponse<StrapiArticle>;
    return data.data || [];
}

export async function searchArticles(
    query: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    const params = new URLSearchParams({
        "filters[$or][0][title][$containsi]": query,
        "filters[$or][1][summary][$containsi]": query,
        "pagination[page]": page.toString(),
        "pagination[pageSize]": pageSize.toString(),
        populate: "*",
        "sort[0]": "publishedAt:desc",
        "filters[publishedAt][$notNull]": "true",
    });

    const response = await fetch(`${API_BASE_URL}/news-articles?${params}`, {
        headers: createHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to search articles: ${response.statusText}`);
    }

    const data = (await response.json()) as StrapiResponse<StrapiArticle>;
    return {
        articles: data.data || [],
        total: data.meta?.pagination?.total || 0,
    };
}

export async function getArticlesByDateRange(
    startDate: string,
    endDate: string,
    page: number = 1,
    pageSize: number = 25
): Promise<{ articles: StrapiArticle[]; total: number }> {
    const params = new URLSearchParams({
        "filters[publishedAt][$gte]": startDate,
        "filters[publishedAt][$lte]": endDate,
        "pagination[page]": page.toString(),
        "pagination[pageSize]": pageSize.toString(),
        populate: "*",
        "sort[0]": "publishedAt:desc",
    });

    const response = await fetch(`${API_BASE_URL}/news-articles?${params}`, {
        headers: createHeaders(),
    });

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
}
