import { getCategories } from "@/infrastructure/strapi/category-repository";
import { getArticlesByCategory } from "@/infrastructure/strapi/article-repository";
import { convertStrapiToArticle } from "@/infrastructure/strapi/transformers";
import type { Article } from "@/domain/article";

export async function getCategoryArticles(slug: string): Promise<{
    categoryName: string;
    articles: Article[];
    validSlugs: string[];
} | null> {
    const strapiCategories = await getCategories();
    const validSlugs = strapiCategories.map((c) => c.name.toLowerCase());

    if (!validSlugs.includes(slug)) return null;

    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
    const { articles } = await getArticlesByCategory(categoryName, 1, 25);

    return {
        categoryName,
        articles: articles.map(convertStrapiToArticle),
        validSlugs,
    };
}
