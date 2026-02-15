"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
                <SheetHeader>
                    <SheetTitle className="text-left text-xl font-bold">
                        NewsWire
                    </SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <nav className="flex flex-col gap-1">
                    {categories.map((cat) => {
                        const href = cat.slug ? `/category/${cat.slug}` : "/";
                        const isActive =
                            cat.slug === ""
                                ? pathname === "/"
                                : pathname === `/category/${cat.slug}`;
                        return (
                            <Link
                                key={cat.slug}
                                href={href}
                                onClick={() => setOpen(false)}
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
            </SheetContent>
        </Sheet>
    );
}
