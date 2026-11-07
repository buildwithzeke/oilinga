import Link from "next/link";
import type { Category } from "@/lib/data";
import { categoryCounts } from "@/lib/data";

export interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    const counts = categoryCounts();

    return (
        <div className="oi-category-grid">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/marketplace?category=${category.id}`}
                    className="oi-category-card"
                >
                    <span className="oi-category-card__icon" aria-hidden="true">
                        {category.glyph}
                    </span>
                    <strong className="oi-category-card__name">{category.name}</strong>
                    <small className="oi-category-card__caption">
                        {counts[category.id]} {counts[category.id] === 1 ? "product" : "products"}
                    </small>
                </Link>
            ))}
        </div>
    );
}
