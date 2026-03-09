import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/infrastructure/strapi/article-repository";
import { convertStrapiToArticle } from "@/infrastructure/strapi/transformers";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q");

    if (!query || !query.trim()) {
        return NextResponse.json([]);
    }

    try {
        const { articles } = await searchArticles(query.trim());
        return NextResponse.json(articles.map(convertStrapiToArticle));
    } catch {
        return NextResponse.json([], { status: 500 });
    }
}
