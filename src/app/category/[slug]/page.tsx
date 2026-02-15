import { notFound } from "next/navigation";
import { categories, getArticlesByCategory } from "@/lib/data";
import { NewsCard } from "@/components/news-card";

export function generateStaticParams() {
    return categories
        .filter((c) => c.slug !== "")
        .map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return params.then(({ slug }) => {
        const category = categories.find((c) => c.slug === slug);
        return {
            title: category
                ? `${category.name} - NewsWire`
                : "Category - NewsWire",
        };
    });
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const category = categories.find((c) => c.slug === slug);

    if (!category || category.slug === "") {
        notFound();
    }

    const categoryArticles = getArticlesByCategory(slug);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
            {categoryArticles.length === 0 ? (
                <p className="text-muted-foreground">
                    No articles found in this category.
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryArticles.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}
