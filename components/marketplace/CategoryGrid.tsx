"use client";

import type { Category } from "@/lib/data";

export interface CategoryGridProps {
    categories: Category[];
    onSelect?: (category: Category) => void;
}

export function CategoryGrid({ categories, onSelect }: CategoryGridProps) {
    return (
        <div className="oi-category-grid">
            {categories.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    className="oi-category-card"
                    onClick={() => onSelect?.(category)}
                >
                    <span className="oi-category-card__icon" aria-hidden="true">
                        {category.glyph}
                    </span>
                    <strong className="oi-category-card__name">{category.name}</strong>
                    <small className="oi-category-card__caption">{category.caption}</small>
                </button>
            ))}
        </div>
    );
}
