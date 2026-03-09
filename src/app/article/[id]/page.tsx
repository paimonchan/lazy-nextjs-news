import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getArticles } from "@/infrastructure/strapi/article-repository";
import { getArticleDetail } from "@/application/get-article-detail";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/error-message";

export async function generateStaticParams() {
    try {
        const { articles } = await getArticles(1, 100);
        return articles.map((a) => ({ id: a.documentId }));
    } catch {
        console.warn(
            "Could not fetch articles from Strapi during build, using empty params"
        );
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
        const article = await getArticleDetail(id);
        return {
            title: article
                ? `${article.title} - NewsWire`
                : "Article - NewsWire",
            description: article?.summary,
        };
    } catch {
        return { title: "Article - NewsWire" };
    }
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    try {
        const { id } = await params;
        const article = await getArticleDetail(id);

        if (!article) notFound();

        const displayCategory =
            article.categoryName.charAt(0).toUpperCase() +
            article.categoryName.slice(1);

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
                        <Link href={`/category/${article.categorySlug}`}>
                            <Badge
                                variant="secondary"
                                className="hover:bg-accent"
                            >
                                {displayCategory}
                            </Badge>
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            {article.publishedAt}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                        {article.title}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-4">
                        {article.summary}
                    </p>

                    <p className="text-sm text-muted-foreground mb-6">
                        By {article.authorName}
                    </p>

                    <div className="relative bg-muted aspect-[16/9] rounded-lg overflow-hidden mb-8">
                        {article.image ? (
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <span className="text-muted-foreground">
                                    {displayCategory} Image
                                </span>
                            </div>
                        )}
                    </div>

                    <Separator className="mb-8" />

                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        {article.contentParagraphs.map((paragraph, i) => (
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
            <ErrorMessage message="Failed to load article. Please try again later." />
        );
    }
}
