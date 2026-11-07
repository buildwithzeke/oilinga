"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

export interface FilterPanelProps {
    children: ReactNode;
}

/**
 * Filter sidebar that collapses into a toggleable panel on tablet and mobile.
 * On desktop the summary is hidden by CSS and the body is always visible.
 */
export function FilterPanel({ children }: FilterPanelProps) {
    const [open, setOpen] = useState(false);

    return (
        <aside className="oi-filters" aria-label="Marketplace filters">
            <button
                type="button"
                className="oi-filters__summary"
                aria-expanded={open}
                aria-controls="marketplace-filter-body"
                onClick={() => setOpen((value) => !value)}
            >
                <span>Filters</span>
                <Icon name="chevron-down" size={18} />
            </button>
            <div
                id="marketplace-filter-body"
                className={cn("oi-filters__body", open && "is-open")}
            >
                {children}
            </div>
        </aside>
    );
}
