import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="mt-auto">
            <Separator />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} NewsWire. All rights
                        reserved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Built with Next.js &amp; shadcn/ui
                    </p>
                </div>
            </div>
        </footer>
    );
}
