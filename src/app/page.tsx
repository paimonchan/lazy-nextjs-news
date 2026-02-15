import { getArticles } from "@/lib/api";
import { NewsCard } from "@/components/news-card";
import type { StrapiArticle } from "@/lib/api";

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

export default async function Home() {
    try {
        const { articles } = await getArticles(1, 13);

        if (!articles || articles.length === 0) {
            return (
                <div className="container mx-auto px-4 py-8">
                    <p className="text-muted-foreground">
                        No articles available. Make sure Strapi backend is
                        running at{" "}
                        {process.env.NEXT_PUBLIC_STRAPI_URL ||
                            "http://localhost:1337"}
                    </p>
                </div>
            );
        }

        const featured = convertStrapiToArticle(articles[0]);
        const latest = articles.slice(1).map(convertStrapiToArticle);

        return (
            <div className="container mx-auto px-4 py-8">
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Featured</h2>
                    <NewsCard article={featured} featured />
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4">Latest News</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {latest.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.warn("Error loading articles:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                    <p className="font-semibold">Strapi Backend Unavailable</p>
                    <p className="mt-2 text-sm">
                        The application is configured to use Strapi backend at{" "}
                        <code className="rounded bg-yellow-100 px-2 py-1 dark:bg-yellow-800/50">
                            {process.env.NEXT_PUBLIC_STRAPI_URL ||
                                "http://localhost:1337"}
                        </code>
                    </p>
                    <p className="mt-2 text-sm">
                        Please start the Strapi backend to load articles.
                    </p>
                </div>
            </div>
        );
    }
}
