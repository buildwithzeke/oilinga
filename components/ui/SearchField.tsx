"use client";

import { type FormEvent, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface SearchFieldProps {
    placeholder?: string;
    label?: string;
    size?: "sm" | "lg";
    defaultValue?: string;
    onSubmit?: (value: string) => void;
    className?: string;
}

export function SearchField({
    placeholder = "Search oils…",
    label = "Search products",
    size = "sm",
    defaultValue = "",
    onSubmit,
    className,
}: SearchFieldProps) {
    const [value, setValue] = useState(defaultValue);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit?.(value.trim());
    }

    return (
        <form
            role="search"
            className={cn("oi-search", size === "lg" && "oi-search--lg", className)}
            onSubmit={handleSubmit}
        >
            <Icon name="search" size={17} className="oi-search__icon" />
            <input
                type="search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
                aria-label={label}
            />
            {size === "lg" ? (
                <button type="submit" className="oi-search__submit">
                    Search
                </button>
            ) : (
                <button type="submit" className="oi-sr-only">
                    Search
                </button>
            )}
        </form>
    );
}
