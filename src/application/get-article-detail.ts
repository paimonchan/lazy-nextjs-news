import { getArticleById } from "@/infrastructure/strapi/article-repository";

export interface ArticleDetail {
    id: string;
    title: string;
    summary: string;
    image: string;
    categoryName: string;
    categorySlug: string;
    authorName: string;
    publishedAt: string;
    contentParagraphs: string[];
}

export async function getArticleDetail(
    id: string
): Promise<ArticleDetail | null> {
    const strapiArticle = await getArticleById(id);

    if (!strapiArticle) return null;

    const categoryName =
        strapiArticle.category?.name?.toLowerCase() || "news";
    const categorySlug = categoryName;
    const publishedAt = new Date(strapiArticle.publishedAt)
        .toISOString()
        .split("T")[0];
    const contentParagraphs = strapiArticle.content
        ? strapiArticle.content.split("\n\n")
        : strapiArticle.summary.split(". ");

    return {
        id: strapiArticle.documentId,
        title: strapiArticle.title,
        summary: strapiArticle.summary,
        image: strapiArticle.image || "",
        categoryName,
        categorySlug,
        authorName: strapiArticle.source?.name || "Unknown",
        publishedAt,
        contentParagraphs,
    };
}
