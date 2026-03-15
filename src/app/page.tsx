import { unstable_noStore as noStore } from "next/cache";
import { getHomeArticles } from "@/application/get-home-articles";
import { NewsCard } from "@/components/news-card";
import { ErrorMessage } from "@/components/error-message";

export default async function Home() {
    noStore();
    const result = await getHomeArticles();

    if (!result) {
        return (
            <ErrorMessage
                variant="warning"
                title="Strapi Backend Unavailable"
                message="The Strapi backend is unavailable. Please start the Strapi backend to load articles."
            />
        );
    }

    const { featured, latest } = result;

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
}
