import { getCategories } from "@/infrastructure/strapi/category-repository";
import type { Category } from "@/domain/category";
import { categories as fallbackCategories } from "@/domain/category";

export async function getNavCategories(): Promise<Category[]> {
    try {
        const strapiCategories = await getCategories();

        if (!strapiCategories || strapiCategories.length === 0) {
            return fallbackCategories;
        }

        const dynamicCategories: Category[] = [
            { name: "Home", slug: "" },
            ...strapiCategories.map((c) => ({
                name: c.name,
                slug: c.name.toLowerCase(),
            })),
        ];

        return dynamicCategories;
    } catch {
        return fallbackCategories;
    }
}
