import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/data";

interface NewsCardProps {
    article: Article;
    featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
    return (
        <Link href={`/article/${article.id}`}>
            <Card
                className={`group overflow-hidden transition-colors hover:bg-accent/50 ${featured ? "md:grid md:grid-cols-2" : ""}`}
            >
                <div
                    className={`bg-muted ${featured ? "aspect-[16/9] md:aspect-auto md:min-h-[300px]" : "aspect-[16/9]"} flex items-center justify-center`}
                >
                    <div className="text-muted-foreground text-sm">
                        {article.category.charAt(0).toUpperCase() +
                            article.category.slice(1)}{" "}
                        Image
                    </div>
                </div>
                <div>
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                {article.category.charAt(0).toUpperCase() +
                                    article.category.slice(1)}
                            </Badge>
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
