import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/domain/article";

interface NewsCardProps {
    article: Article;
    featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
    const categoryLabel =
        article.category.charAt(0).toUpperCase() + article.category.slice(1);

    return (
        <Link href={`/article/${article.id}`}>
            <Card
                className={`group overflow-hidden transition-colors hover:bg-accent/50 ${featured ? "md:grid md:grid-cols-2" : ""}`}
            >
                <div
                    className={`relative bg-muted ${featured ? "aspect-[16/9] md:aspect-auto md:min-h-[300px]" : "aspect-[16/9]"} overflow-hidden`}
                >
                    {article.image ? (
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes={
                                featured
                                    ? "(max-width: 768px) 100vw, 50vw"
                                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            }
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <span className="text-muted-foreground text-sm">
                                {categoryLabel} Image
                            </span>
                        </div>
                    )}
                </div>
                <div>
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">{categoryLabel}</Badge>
                            <span className="text-xs text-muted-foreground">
                                {article.publishedAt}
                            </span>
                        </div>
                        <h3
                            className={`font-semibold leading-tight group-hover:underline ${featured ? "text-xl md:text-2xl" : "text-lg"}`}
                        >
                            {article.title}
                        </h3>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {article.description}
                        </p>
                        <p className="mt-3 text-xs text-muted-foreground">
                            By {article.author}
                        </p>
                    </CardContent>
                </div>
            </Card>
        </Link>
    );
}
