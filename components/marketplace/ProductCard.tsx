"use client";

import Link from "next/link";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { StarRating } from "@/components/ui/StarRating";
import { useToast } from "@/components/ui/Toast";

export interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const notify = useToast();

    return (
        <article className="oi-product-card">
            <Link
                href={`/products/${product.slug}`}
                className={cn(
                    "oi-product-card__art",
                    `oi-product-card__art--${product.art}`,
                )}
                aria-label={`View ${product.name}`}
                tabIndex={-1}
            >
                <Badge tone="neutral" className="oi-product-card__tag">
                    {product.tag}
                </Badge>
                <span className="oi-product-card__glyph" aria-hidden="true">
                    {product.glyph}
                </span>
            </Link>
            <div className="oi-product-card__body">
                <Link
                    href={`/shops/${product.shopSlug}`}
                    className="oi-product-card__seller"
                >
                    <Icon name="check" size={12} />
                    {product.seller}
                </Link>
                <h3 className="oi-product-card__name">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="oi-product-card__meta">{product.detail}</p>
                <StarRating
                    rating={product.rating}
                    reviews={product.reviews}
                    className="oi-product-card__rating"
                />
                <div className="oi-product-card__footer">
                    <strong className="oi-product-card__price">{product.price}</strong>
                    <button
                        type="button"
                        className="oi-add-btn"
                        onClick={() => notify(`${product.name} added to your cart`)}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <Icon name="plus" size={18} />
                    </button>
                </div>
            </div>
        </article>
    );
}

export interface ProductGridProps {
    products: Product[];
    compact?: boolean;
}

export function ProductGrid({ products, compact = false }: ProductGridProps) {
    return (
        <div className={cn("oi-product-grid", compact && "oi-product-grid--compact")}>
            {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
            ))}
        </div>
    );
}
