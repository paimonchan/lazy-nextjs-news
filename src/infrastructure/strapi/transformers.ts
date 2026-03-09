import type { StrapiArticle } from "@/infrastructure/strapi/types";
import type { Article } from "@/domain/article";

export function convertStrapiToArticle(strapiArticle: StrapiArticle): Article {
    return {
        id: strapiArticle.documentId,
        title: strapiArticle.title,
        description: strapiArticle.summary,
        content: strapiArticle.content || strapiArticle.summary,
        category: strapiArticle.category?.name?.toLowerCase() || "news",
        image: strapiArticle.image || "",
        author: strapiArticle.source?.name || "Unknown",
        publishedAt: new Date(strapiArticle.publishedAt)
            .toISOString()
            .split("T")[0],
    };
}
