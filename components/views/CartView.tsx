"use client";

import { useCart } from "@/lib/cart-context";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

function formatPrice(value: number): string {
    return "₦" + value.toLocaleString("en-NG");
}

export function CartView() {
    const { items, totalCount, removeItem, updateQty, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className="oi-page">
                <div className="oi-cart-empty">
                    <img
                        src="/assets/illustrations/empty-cart.svg"
                        alt="Empty cart"
                        className="oi-cart-empty__img"
                        width={180}
                        height={180}
                    />
                    <h1 className="oi-page-title">Your cart is empty</h1>
                    <p className="oi-muted">Looks like you haven't added anything yet.</p>
                    <ButtonLink href="/marketplace" variant="primary">
                        Browse marketplace
                    </ButtonLink>
                </div>
            </main>
        );
    }

    const subtotal = items.reduce(
        (sum, item) => sum + item.product.priceValue * item.quantity,
        0,
    );

    return (
        <main className="oi-page">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
            <h1 className="oi-page-title">
                Your cart{" "}
                <span className="oi-muted" style={{ fontWeight: 400, fontSize: "0.85em" }}>
                    ({totalCount} item{totalCount !== 1 ? "s" : ""})
                </span>
            </h1>

            <div className="oi-cart-layout">
                {/* Items column */}
                <div>
                    {items.map(({ product, quantity }) => (
                        <div key={product.slug} className="oi-cart-item">
                            <span
                                className={cn(
                                    "oi-cart-item__art",
                                    `oi-cart-item__art--${product.art}`,
                                )}
                                aria-hidden="true"
                            >
                                {product.glyph}
                            </span>
                            <div className="oi-cart-item__info">
                                <p className="oi-cart-item__name">{product.name}</p>
                                <p className="oi-cart-item__meta">{product.seller}</p>
                                <p className="oi-cart-item__meta">
                                    {product.price} each
                                </p>
                            </div>
                            <div className="oi-stepper" role="group" aria-label={`Quantity for ${product.name}`}>
                                <button
                                    type="button"
                                    className="oi-stepper__btn"
                                    aria-label="Decrease quantity"
                                    onClick={() => updateQty(product.slug, quantity - 1)}
                                >
                                    <Icon name="close" size={12} />
                                </button>
                                <span className="oi-stepper__qty" aria-live="polite">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    className="oi-stepper__btn"
                                    aria-label="Increase quantity"
                                    onClick={() => updateQty(product.slug, quantity + 1)}
                                >
                                    <Icon name="plus" size={12} />
                                </button>
                            </div>
                            <p className="oi-cart-item__price">
                                {formatPrice(product.priceValue * quantity)}
                            </p>
                            <button
                                type="button"
                                className="oi-btn-icon"
                                aria-label={`Remove ${product.name} from cart`}
                                onClick={() => removeItem(product.slug)}
                            >
                                <Icon name="close" size={16} />
                            </button>
                        </div>
                    ))}

                    <div style={{ marginTop: "var(--space-4)" }}>
                        <button
                            type="button"
                            className="oi-btn oi-btn--outline oi-btn--sm"
                            onClick={clearCart}
                        >
                            Clear cart
                        </button>
                    </div>
                </div>

                {/* Summary column */}
                <aside className="oi-cart-summary">
                    <h2 className="oi-card-head">Order summary</h2>
                    <div className="oi-cart-summary__total">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <p className="oi-muted" style={{ fontSize: "var(--text-xs)", marginBlock: "var(--space-2)" }}>
                        Delivery calculated at checkout
                    </p>
                    <hr style={{ margin: "var(--space-4) 0" }} />
                    <div className="oi-cart-summary__total" style={{ fontWeight: "bold" }}>
                        <span>Total</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <ButtonLink
                        href="/checkout"
                        variant="gold"
                        block
                        style={{ marginTop: "var(--space-4)" }}
                    >
                        Proceed to checkout
                    </ButtonLink>
                </aside>
            </div>
        </main>
    );
}
