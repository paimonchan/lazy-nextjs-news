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

export interface StrapiCategory {
    id: number;
    documentId: string;
    name: string;
}

export interface StrapiSource {
    id: number;
    documentId: string;
    name: string;
    url: string;
    description?: string;
}

export interface StrapiResponse<T> {
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

export interface StrapiSingleResponse<T> {
    data: T;
    meta?: Record<string, unknown>;
}
