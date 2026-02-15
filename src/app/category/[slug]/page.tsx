import { notFound } from "next/navigation";
import { getArticles, getArticlesByCategory } from "@/lib/api";
import { NewsCard } from "@/components/news-card";
import type { StrapiArticle } from "@/lib/api";

const CATEGORY_SLUGS = [
    "technology",
    "business",
    "sports",
    "entertainment",
    "health",
    "science",
];

function convertStrapiToArticle(strapiArticle: StrapiArticle) {
    return {
        id: strapiArticle.documentId,
        title: strapiArticle.title,
        description: strapiArticle.summary,
        content: strapiArticle.content || strapiArticle.summary,
        category: strapiArticle.category?.name?.toLowerCase() || "news",
        image: "/placeholder.jpg",
        author: strapiArticle.source?.name || "Unknown",
        publishedAt: new Date(strapiArticle.publishedAt)
            .toISOString()
            .split("T")[0],
    };
}

export async function generateStaticParams() {
    try {
        // Try to fetch categories from Strapi
        const { articles } = await getArticles(1, 100);
        const slugs = new Set<string>();

        articles.forEach((article) => {
            const categoryName = article.category?.name;
            if (categoryName) {
                const slug = categoryName.toLowerCase();
                slugs.add(slug);
            }
        });

        return Array.from(slugs).map((slug) => ({ slug }));
    } catch (error) {
        console.warn(
            "Could not fetch categories from Strapi, using default categories"
        );
        // Fallback to predefined categories if Strapi is unavailable
        return CATEGORY_SLUGS.map((slug) => ({ slug }));
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
        title: `${categoryName} - NewsWire`,
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    try {
        const { slug } = await params;

        if (!CATEGORY_SLUGS.includes(slug)) {
            notFound();
        }

        const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
        const { articles } = await getArticlesByCategory(categoryName, 1, 25);

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
                {articles.length === 0 ? (
                    <p className="text-muted-foreground">
                        No articles found in this category.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <NewsCard
                                key={article.documentId}
                                article={convertStrapiToArticle(article)}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error loading category:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-red-500">
                    Failed to load articles. Please try again later.
                </p>
            </div>
        );
    }
}
