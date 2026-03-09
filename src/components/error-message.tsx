interface ErrorMessageProps {
    title?: string;
    message: string;
    variant?: "error" | "warning";
}

export function ErrorMessage({
    title,
    message,
    variant = "error",
}: ErrorMessageProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            {variant === "warning" ? (
                <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                    {title && <p className="font-semibold">{title}</p>}
                    <p className={title ? "mt-2 text-sm" : ""}>{message}</p>
                </div>
            ) : (
                <p className="text-red-500">{message}</p>
            )}
        </div>
    );
}
