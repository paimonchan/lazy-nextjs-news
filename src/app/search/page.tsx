"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news-card";
import type { Article } from "@/domain/article";

async function fetchSearchResults(query: string): Promise<Article[]> {
    const params = new URLSearchParams({
        q: query,
    });

    const response = await fetch(`/api/search?${params}`);

    if (!response.ok) return [];

    return response.json();
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function performSearch(searchQuery: string) {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setSearched(true);

        try {
            const articles = await fetchSearchResults(searchQuery.trim());
            setResults(articles);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.set("q", query.trim());
        window.history.replaceState(null, "", url.toString());
        performSearch(query);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Search Articles</h1>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-8 max-w-xl">
                <Input
                    type="search"
                    placeholder="Search for articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" disabled={loading || !query.trim()}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                </Button>
            </form>

            {loading && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg border bg-card animate-pulse"
                        >
                            <div className="aspect-[16/9] bg-muted rounded-t-lg" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-muted rounded w-1/4" />
                                <div className="h-5 bg-muted rounded w-3/4" />
                                <div className="h-4 bg-muted rounded w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && searched && results.length === 0 && (
                <p className="text-muted-foreground">
                    No articles found for &quot;{searchParams.get("q") || query}&quot;.
                    Try a different search term.
                </p>
            )}

            {!loading && results.length > 0 && (
                <>
                    <p className="text-sm text-muted-foreground mb-4">
                        {results.length} result{results.length !== 1 && "s"} found
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {results.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
