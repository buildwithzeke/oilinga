"use client";

import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/data";

export interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
    const notify = useToast();
    const { addItem } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const wished = isInWishlist(product.slug);

    function handleAddToCart() {
        addItem(product);
        notify(`${product.name} added to your cart`);
    }

    function handleToggleWishlist() {
        toggleWishlist(product);
        notify(wished ? "Removed from wishlist" : "Added to wishlist");
    }

    return (
        <div className="oi-pdp__actions">
            <button
                type="button"
                className="oi-btn oi-btn--gold oi-btn--lg"
                onClick={handleAddToCart}
            >
                Add to cart
                <Icon name="bag" size={17} />
            </button>
            <button
                type="button"
                className={cn("oi-btn oi-btn--outline oi-btn--lg", wished && "is-active")}
                onClick={handleToggleWishlist}
                aria-pressed={wished}
            >
                <Icon name="heart" size={17} />
                {wished ? "Saved ♡" : "Save for later"}
            </button>
        </div>
    );
}
