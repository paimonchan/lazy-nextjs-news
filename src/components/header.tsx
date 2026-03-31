"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category } from "@/domain/category";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";

interface HeaderProps {
    categories: Category[];
}

export function Header({ categories }: HeaderProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        PMC News
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">
                        {categories.map((cat) => {
                            const href = cat.slug
                                ? `/category/${cat.slug}`
                                : "/";
                            const isActive =
                                cat.slug === ""
                                    ? pathname === "/"
                                    : pathname === `/category/${cat.slug}`;
                            return (
                                <Link
                                    key={cat.slug}
                                    href={href}
                                    className={cn(
                                        "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                                        isActive &&
                                            "bg-accent text-accent-foreground"
                                    )}
                                >
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        aria-label="Search articles"
                    >
                        <Link href="/search">
                            <Search className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                    <MobileNav categories={categories} />
                </div>
            </div>
        </header>
    );
}
