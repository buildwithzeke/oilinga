"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import type { DeliveryInfo, PaymentMethod, CustomerOrder } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const NIGERIAN_STATES = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT (Abuja)",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
];

const STEPS = ["Delivery", "Payment", "Review"] as const;

function formatPrice(value: number): string {
    return "₦" + value.toLocaleString("en-NG");
}

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: Parameters<typeof Icon>[0]["name"] }[] = [
    { value: "card", label: "Pay by Card", icon: "lock" },
    { value: "bank-transfer", label: "Bank Transfer", icon: "wallet" },
    { value: "pay-on-delivery", label: "Pay on Delivery", icon: "package" },
];

const ORDERS_KEY = "oilinga_orders";

function readOrders(): CustomerOrder[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(ORDERS_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as CustomerOrder[]) : [];
    } catch {
        return [];
    }
}

function writeOrders(orders: CustomerOrder[]): void {
    try {
        window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
        // Storage may be unavailable.
    }
}

export function CheckoutView() {
    const router = useRouter();
    const { items, clearCart } = useCart();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        name: "",
        phone: "",
        address: "",
        state: "",
        notes: "",
    });
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
    const [errors, setErrors] = useState<Partial<Record<keyof DeliveryInfo, string>>>({});

    const subtotal = items.reduce(
        (sum, item) => sum + item.product.priceValue * item.quantity,
        0,
    );

    function validateDelivery(): boolean {
        const newErrors: Partial<Record<keyof DeliveryInfo, string>> = {};
        if (!deliveryInfo.name.trim()) newErrors.name = "Full name is required";
        if (!deliveryInfo.phone.trim()) newErrors.phone = "Phone number is required";
        if (!deliveryInfo.address.trim()) newErrors.address = "Address is required";
        if (!deliveryInfo.state) newErrors.state = "Please select a state";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleDeliveryContinue() {
        if (validateDelivery()) setStep(2);
    }

    function handlePlaceOrder() {
        const id = "OL-" + Math.random().toString(36).slice(2, 6).toUpperCase();
        const order: CustomerOrder = {
            id,
            date: new Date().toISOString(),
            items,
            subtotal,
            delivery: deliveryInfo,
            payment: paymentMethod,
            status: "Processing",
        };
        const existing = readOrders();
        writeOrders([...existing, order]);
        clearCart();
        router.push("/orders/" + id);
    }

    return (
        <main className="oi-page">
            <Breadcrumbs
                items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
            />
            <h1 className="oi-page-title">Checkout</h1>

            {/* Step indicator */}
            <nav className="oi-checkout-steps" aria-label="Checkout steps">
                {STEPS.map((label, index) => {
                    const num = (index + 1) as 1 | 2 | 3;
                    const isDone = step > num;
                    const isActive = step === num;
                    return (
                        <div
                            key={label}
                            className={cn(
                                "oi-checkout-step",
                                isActive && "is-active",
                                isDone && "is-done",
                            )}
                        >
                            <span className="oi-checkout-step__num" aria-hidden="true">
                                {isDone ? <Icon name="check" size={14} /> : num}
                            </span>
                            <span>{label}</span>
                        </div>
                    );
                })}
            </nav>

            {/* Step 1: Delivery */}
            {step === 1 && (
                <div className="oi-checkout-layout">
                    <section aria-label="Delivery details">
                        <h2 className="oi-section-title">Delivery details</h2>
                        <div className="oi-form-group">
                            <label className="oi-form-label" htmlFor="d-name">Full name</label>
                            <input
                                id="d-name"
                                type="text"
                                className="oi-form-input"
                                value={deliveryInfo.name}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                                aria-describedby={errors.name ? "d-name-err" : undefined}
                                autoComplete="name"
                            />
                            {errors.name && (
                                <span id="d-name-err" className="oi-form-error" role="alert">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className="oi-form-group">
                            <label className="oi-form-label" htmlFor="d-phone">Phone number</label>
                            <input
                                id="d-phone"
                                type="tel"
                                className="oi-form-input"
                                value={deliveryInfo.phone}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                                aria-describedby={errors.phone ? "d-phone-err" : undefined}
                                autoComplete="tel"
                            />
                            {errors.phone && (
                                <span id="d-phone-err" className="oi-form-error" role="alert">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                        <div className="oi-form-group">
                            <label className="oi-form-label" htmlFor="d-address">Delivery address</label>
                            <textarea
                                id="d-address"
                                rows={3}
                                className="oi-form-input"
                                value={deliveryInfo.address}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                                aria-describedby={errors.address ? "d-address-err" : undefined}
                                autoComplete="street-address"
                            />
                            {errors.address && (
                                <span id="d-address-err" className="oi-form-error" role="alert">
                                    {errors.address}
                                </span>
                            )}
                        </div>
                        <div className="oi-form-group">
                            <label className="oi-form-label" htmlFor="d-state">State</label>
                            <select
                                id="d-state"
                                className="oi-form-input"
                                value={deliveryInfo.state}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })}
                                aria-describedby={errors.state ? "d-state-err" : undefined}
                            >
                                <option value="">Select state…</option>
                                {NIGERIAN_STATES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            {errors.state && (
                                <span id="d-state-err" className="oi-form-error" role="alert">
                                    {errors.state}
                                </span>
                            )}
                        </div>
                        <div className="oi-form-group">
                            <label className="oi-form-label" htmlFor="d-notes">
                                Additional notes <span style={{ fontWeight: 400 }}>(optional)</span>
                            </label>
                            <textarea
                                id="d-notes"
                                rows={2}
                                className="oi-form-input"
                                value={deliveryInfo.notes}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                            />
                        </div>
                        <button
                            type="button"
                            className="oi-btn oi-btn--primary"
                            onClick={handleDeliveryContinue}
                        >
                            Continue to payment
                            <Icon name="arrow-right" size={16} />
                        </button>
                    </section>

                    {/* Cart summary */}
                    <aside className="oi-cart-summary">
                        <h2 className="oi-card-head">Order summary</h2>
                        {items.map(({ product, quantity }) => (
                            <div key={product.slug} className="oi-checkout-review" style={{ gap: "var(--space-1)", marginBottom: "var(--space-2)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "var(--text-sm)" }}>
                                        {product.name} × {quantity}
                                    </span>
                                    <span style={{ fontSize: "var(--text-sm)", fontWeight: "bold" }}>
                                        {formatPrice(product.priceValue * quantity)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <hr style={{ margin: "var(--space-3) 0" }} />
                        <div className="oi-cart-summary__total">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                    </aside>
                </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
                <div className="oi-checkout-layout">
                    <section aria-label="Payment method">
                        <h2 className="oi-section-title">Choose payment method</h2>
                        <div className="oi-checkout-review">
                            {PAYMENT_OPTIONS.map(({ value, label, icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={cn(
                                        "oi-payment-option",
                                        paymentMethod === value && "is-selected",
                                    )}
                                    onClick={() => setPaymentMethod(value)}
                                    aria-pressed={paymentMethod === value}
                                >
                                    <Icon name={icon} size={20} />
                                    <span>{label}</span>
                                    {paymentMethod === value && (
                                        <Icon name="check" size={16} style={{ marginLeft: "auto" }} />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
                            <button
                                type="button"
                                className="oi-btn oi-btn--outline"
                                onClick={() => setStep(1)}
                            >
                                <Icon name="arrow-left" size={16} />
                                Back
                            </button>
                            <button
                                type="button"
                                className="oi-btn oi-btn--primary"
                                onClick={() => setStep(3)}
                            >
                                Review order
                                <Icon name="arrow-right" size={16} />
                            </button>
                        </div>
                    </section>

                    <aside className="oi-cart-summary">
                        <h2 className="oi-card-head">Order summary</h2>
                        <div className="oi-cart-summary__total">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                    </aside>
                </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
                <div className="oi-checkout-layout">
                    <section aria-label="Review your order">
                        <h2 className="oi-section-title">Review your order</h2>

                        <div className="oi-checkout-review">
                            <h3 className="oi-form-label">Delivery address</h3>
                            <p style={{ fontSize: "var(--text-sm)" }}>
                                {deliveryInfo.name}<br />
                                {deliveryInfo.phone}<br />
                                {deliveryInfo.address}<br />
                                {deliveryInfo.state}
                                {deliveryInfo.notes && <><br />{deliveryInfo.notes}</>}
                            </p>
                        </div>

                        <div className="oi-checkout-review oi-form-section">
                            <h3 className="oi-form-label">Payment method</h3>
                            <p style={{ fontSize: "var(--text-sm)", textTransform: "capitalize" }}>
                                {PAYMENT_OPTIONS.find((o) => o.value === paymentMethod)?.label}
                            </p>
                        </div>

                        <div className="oi-checkout-review oi-form-section">
                            <h3 className="oi-form-label">Items</h3>
                            {items.map(({ product, quantity }) => (
                                <div
                                    key={product.slug}
                                    style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", marginBottom: "var(--space-1)" }}
                                >
                                    <span>{product.name} × {quantity}</span>
                                    <span>{formatPrice(product.priceValue * quantity)}</span>
                                </div>
                            ))}
                            <div
                                style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-border)" }}
                            >
                                <span>Total</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
                            <button
                                type="button"
                                className="oi-btn oi-btn--outline"
                                onClick={() => setStep(2)}
                            >
                                <Icon name="arrow-left" size={16} />
                                Back
                            </button>
                            <button
                                type="button"
                                className="oi-btn oi-btn--gold"
                                onClick={handlePlaceOrder}
                                disabled={items.length === 0}
                            >
                                Place order
                                <Icon name="bag" size={16} />
                            </button>
                        </div>
                    </section>

                    <aside className="oi-cart-summary">
                        <h2 className="oi-card-head">Order summary</h2>
                        <div className="oi-cart-summary__total">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                    </aside>
                </div>
            )}
        </main>
    );
}
