import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticles, getArticleById } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { StrapiArticle } from "@/lib/api";

export async function generateStaticParams() {
    try {
        const { articles } = await getArticles(1, 100);
        return articles.map((a) => ({ id: a.documentId }));
    } catch (error) {
        console.warn(
            "Could not fetch articles from Strapi during build, using empty params"
        );
        // Return empty array when Strapi is unavailable
        // Individual pages will still render dynamically
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    try {
        const { id } = await params;
        const article = await getArticleById(id);
        return {
            title: article
                ? `${article.title} - NewsWire`
                : "Article - NewsWire",
            description: article?.summary,
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Article - NewsWire",
        };
    }
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    try {
        const { id } = await params;
        const article = await getArticleById(id);

        if (!article) {
            notFound();
        }

        const categoryName = article.category?.name?.toLowerCase() || "news";
        const contentParagraphs =
            article.content?.split("\n\n") || article.summary.split(". ");

        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <Button variant="ghost" asChild className="mb-6 -ml-3">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>

                <article>
                    <div className="flex items-center gap-3 mb-4">
                        <Link href={`/category/${categoryName}`}>
                            <Badge
                                variant="secondary"
                                className="hover:bg-accent"
                            >
                                {categoryName.charAt(0).toUpperCase() +
                                    categoryName.slice(1)}
                            </Badge>
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            {
                                new Date(article.publishedAt)
                                    .toISOString()
                                    .split("T")[0]
                            }
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                        {article.title}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-4">
                        {article.summary}
                    </p>

                    <p className="text-sm text-muted-foreground mb-6">
                        By {article.source?.name || "Unknown"}
                    </p>

                    <div className="bg-muted aspect-[16/9] rounded-lg flex items-center justify-center mb-8">
                        <span className="text-muted-foreground">
                            {categoryName.charAt(0).toUpperCase() +
                                categoryName.slice(1)}{" "}
                            Image
                        </span>
                    </div>

                    <Separator className="mb-8" />

                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        {contentParagraphs.map((paragraph, i) => (
                            <p key={i} className="mb-4 leading-7">
                                {paragraph.trim()}
                            </p>
                        ))}
                    </div>
                </article>
            </div>
        );
    } catch (error) {
        console.error("Error loading article:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-red-500">
                    Failed to load article. Please try again later.
                </p>
            </div>
        );
    }
}
