import { notFound } from "next/navigation";
import { getCategoryArticles } from "@/application/get-category-articles";
import { NewsCard } from "@/components/news-card";
import { ErrorMessage } from "@/components/error-message";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
    return { title: `${categoryName} - NewsWire` };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    try {
        const { slug } = await params;
        const result = await getCategoryArticles(slug);

        if (!result) notFound();

        const { categoryName, articles } = result;

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
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error loading category:", error);
        return (
            <ErrorMessage message="Failed to load articles. Please try again later." />
        );
    }
}
