function getStrapiUrl(): string {
    // Using indexed access to prevent build-time inlining
    const env = process.env;
    return (
        env["STRAPI_INTERNAL_URL"] ||
        env["NEXT_PUBLIC_STRAPI_URL"] ||
        "http://localhost:1337"
    );
}

export function getApiBaseUrl(): string {
    return `${getStrapiUrl()}/api`;
}

export function createHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const token = process.env["STRAPI_API_TOKEN"];
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}
