"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { StarRating } from "@/components/ui/StarRating";

export function WishlistView() {
    const { items, removeFromWishlist } = useWishlist();
    const notify = useToast();

    if (items.length === 0) {
        return (
            <main className="oi-page">
                <div className="oi-wishlist-empty">
                    <img
                        src="/assets/illustrations/no-products.svg"
                        alt="Empty wishlist"
                        width={180}
                        height={180}
                    />
                    <h1 className="oi-page-title">Your wishlist is empty</h1>
                    <p className="oi-muted">Save products you love and come back to them anytime.</p>
                    <ButtonLink href="/marketplace" variant="primary">
                        Browse marketplace
                    </ButtonLink>
                </div>
            </main>
        );
    }

    return (
        <main className="oi-page">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
            <h1 className="oi-page-title">
                Your wishlist{" "}
                <span className="oi-muted" style={{ fontWeight: 400, fontSize: "0.85em" }}>
                    ({items.length})
                </span>
            </h1>
            <div className="oi-product-grid">
                {items.map(({ product }) => (
                    <article key={product.slug} className="oi-product-card">
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
                            {/* Remove from wishlist */}
                            <button
                                type="button"
                                className="oi-product-card__wish is-active"
                                aria-label={`Remove ${product.name} from wishlist`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeFromWishlist(product.slug);
                                    notify("Removed from wishlist");
                                }}
                            >
                                <Icon name="heart" size={14} />
                            </button>
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
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
