import { getArticles } from "@/infrastructure/strapi/article-repository";
import { convertStrapiToArticle } from "@/infrastructure/strapi/transformers";
import type { Article } from "@/domain/article";

export async function getHomeArticles(): Promise<{
    featured: Article;
    latest: Article[];
} | null> {
    try {
        const { articles } = await getArticles(1, 13);

        if (!articles || articles.length === 0) return null;

        const featured = convertStrapiToArticle(articles[0]);
        const latest = articles.slice(1).map(convertStrapiToArticle);

        return { featured, latest };
    } catch {
        return null;
    }
}
