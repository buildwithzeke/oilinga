"use client";

import { useRouter } from "next/navigation";
import { SearchField } from "@/components/ui/SearchField";

export interface RouteSearchProps {
    basePath: string;
    placeholder?: string;
    label?: string;
    size?: "sm" | "lg";
    defaultValue?: string;
    className?: string;
    /** Existing query parameters to keep when the search is submitted. */
    keep?: Record<string, string | number | undefined>;
}

export function RouteSearch({
    basePath,
    placeholder = "Search oils…",
    label = "Search products",
    size = "sm",
    defaultValue = "",
    className,
    keep = {},
}: RouteSearchProps) {
    const router = useRouter();

    function submit(value: string) {
        const params = new URLSearchParams();

        Object.entries(keep).forEach(([key, entry]) => {
            if (entry !== undefined && entry !== "") params.set(key, String(entry));
        });

        if (value) params.set("q", value);

        const query = params.toString();
        router.push(query ? `${basePath}?${query}` : basePath);
    }

    return (
        <SearchField
            placeholder={placeholder}
            label={label}
            size={size}
            defaultValue={defaultValue}
            onSubmit={submit}
            className={className}
        />
    );
}
