"use client";

import { useRouter } from "next/navigation";

export interface QuerySelectProps {
    label: string;
    basePath: string;
    param: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    keep?: Record<string, string | number | undefined>;
}

export function QuerySelect({
    label,
    basePath,
    param,
    value,
    options,
    keep = {},
}: QuerySelectProps) {
    const router = useRouter();

    function change(next: string) {
        const params = new URLSearchParams();

        Object.entries(keep).forEach(([key, entry]) => {
            if (entry !== undefined && entry !== "") params.set(key, String(entry));
        });

        if (next && next !== "recommended") params.set(param, next);
        else params.delete(param);

        const query = params.toString();
        router.push(query ? `${basePath}?${query}` : basePath);
    }

    return (
        <select
            aria-label={label}
            value={value}
            onChange={(event) => change(event.target.value)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
