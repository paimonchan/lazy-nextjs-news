import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articles, getArticleById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
    return articles.map((a) => ({ id: a.id }));
}

export function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return params.then(({ id }) => {
        const article = getArticleById(id);
        return {
            title: article
                ? `${article.title} - NewsWire`
                : "Article - NewsWire",
            description: article?.description,
        };
    });
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = getArticleById(id);

    if (!article) {
        notFound();
    }

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
                    <Link href={`/category/${article.category}`}>
                        <Badge variant="secondary" className="hover:bg-accent">
                            {article.category.charAt(0).toUpperCase() +
                                article.category.slice(1)}
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
                    {article.description}
                </p>

                <p className="text-sm text-muted-foreground mb-6">
                    By {article.author}
                </p>

                <div className="bg-muted aspect-[16/9] rounded-lg flex items-center justify-center mb-8">
                    <span className="text-muted-foreground">
                        {article.category.charAt(0).toUpperCase() +
                            article.category.slice(1)}{" "}
                        Image
                    </span>
                </div>

                <Separator className="mb-8" />

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {article.content.split("\n\n").map((paragraph, i) => (
                        <p key={i} className="mb-4 leading-7">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>
        </div>
    );
}
