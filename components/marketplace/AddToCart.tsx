"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";

export interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
    const notify = useToast();
    const router = useRouter();
    const { addItem } = useCart();

    function handleAddToCart() {
        addItem(product);
        notify(`${product.name} added to your cart`);
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
                className="oi-btn oi-btn--outline oi-btn--lg"
                onClick={() => router.push("/login?next=/account")}
            >
                <Icon name="heart" size={17} />
                Save for later
            </button>
        </div>
    );
}
