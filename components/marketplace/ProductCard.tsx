"use client";

import type { Product } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export interface ProductCardProps {
    product: Product;
    onAdd?: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
    return (
        <article className="oi-product-card">
            <div className={cn("oi-product-card__art", `oi-product-card__art--${product.art}`)}>
                <Badge tone="neutral" className="oi-product-card__tag">
                    {product.tag}
                </Badge>
                <span className="oi-product-card__glyph" aria-hidden="true">
                    {product.glyph}
                </span>
            </div>
            <div className="oi-product-card__body">
                <small className="oi-product-card__seller">
                    <Icon name="check" size={12} />
                    {product.seller}
                </small>
                <h3 className="oi-product-card__name">{product.name}</h3>
                <p className="oi-product-card__meta">{product.detail}</p>
                <div className="oi-product-card__footer">
                    <strong className="oi-product-card__price">{product.price}</strong>
                    <button
                        type="button"
                        className="oi-add-btn"
                        onClick={() => onAdd?.(product)}
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
    onAdd?: (product: Product) => void;
    compact?: boolean;
}

export function ProductGrid({ products, onAdd, compact = false }: ProductGridProps) {
    return (
        <div className={cn("oi-product-grid", compact && "oi-product-grid--compact")}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
        </div>
    );
}
