const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const API_BASE_URL = `${STRAPI_URL}/api`;

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export function createHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (STRAPI_API_TOKEN) {
        headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    return headers;
}
