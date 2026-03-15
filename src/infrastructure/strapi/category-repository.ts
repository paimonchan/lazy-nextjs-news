import { getApiBaseUrl, createFetchOptions } from "@/infrastructure/strapi/client";
import type {
    StrapiCategory,
    StrapiSource,
    StrapiResponse,
    StrapiSingleResponse,
} from "@/infrastructure/strapi/types";

export async function getCategories(): Promise<StrapiCategory[]> {
    const params = new URLSearchParams({
        "pagination[limit]": "100",
        "sort[0]": "name:asc",
    });

    const response = await fetch(`${getApiBaseUrl()}/categories?${params}`, createFetchOptions());

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = (await response.json()) as StrapiResponse<StrapiCategory>;
    return data.data || [];
}

export async function getCategoryById(
    documentId: string
): Promise<StrapiCategory> {
    const response = await fetch(`${getApiBaseUrl()}/categories/${documentId}`, createFetchOptions());

    if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.statusText}`);
    }

    const data =
        (await response.json()) as StrapiSingleResponse<StrapiCategory>;
    return data.data;
}

export async function getSources(): Promise<StrapiSource[]> {
    const params = new URLSearchParams({
        "pagination[limit]": "100",
        "sort[0]": "name:asc",
    });

    const response = await fetch(`${getApiBaseUrl()}/sources?${params}`, createFetchOptions());

    if (!response.ok) {
        throw new Error(`Failed to fetch sources: ${response.statusText}`);
    }

    const data = (await response.json()) as StrapiResponse<StrapiSource>;
    return data.data || [];
}

export async function getSourceById(documentId: string): Promise<StrapiSource> {
    const response = await fetch(`${getApiBaseUrl()}/sources/${documentId}`, createFetchOptions());

    if (!response.ok) {
        throw new Error(`Failed to fetch source: ${response.statusText}`);
    }

    const data =
        (await response.json()) as StrapiSingleResponse<StrapiSource>;
    return data.data;
}
