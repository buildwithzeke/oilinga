"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { useAuth } from "./AuthProvider";
import { AccountSidebarNav } from "./AccountSidebarNav";
import type { CustomerOrder } from "@/lib/types";

const statusTone: Record<string, BadgeTone> = {
    Processing: "pending",
    Shipped: "shipped",
    Delivered: "delivered",
};

function readCount(key: string): number {
    if (typeof window === "undefined") return 0;
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return 0;
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
        return 0;
    }
}

function readOrders(): CustomerOrder[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem("oilinga_orders");
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as CustomerOrder[]) : [];
    } catch {
        return [];
    }
}

export function AccountView() {
    const router = useRouter();
    const { user, ready } = useAuth();

    const [ordersCount, setOrdersCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [recentOrders, setRecentOrders] = useState<CustomerOrder[]>([]);

    useEffect(() => {
        if (ready && !user) {
            router.replace("/login?next=/account");
        }
    }, [ready, user, router]);

    useEffect(() => {
        if (!user) return;
        setOrdersCount(readCount("oilinga_orders"));
        setWishlistCount(readCount("oilinga_wishlist"));
        setReviewsCount(readCount("oilinga_reviews"));
        const orders = readOrders();
        setRecentOrders(orders.slice(-3).reverse());
    }, [user]);

    if (!ready) {
        return (
            <section className="oi-view oi-container" aria-live="polite">
                <div className="oi-account__loading">Loading your account…</div>
            </section>
        );
    }

    if (!user) {
        return (
            <section className="oi-view oi-container" aria-live="polite">
                <div className="oi-account__loading">Redirecting you to sign in…</div>
            </section>
        );
    }

    const firstName = user.name.split(/\s+/)[0];
    const joined = new Date(`${user.joined}T00:00:00`).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
    });

    return (
        <section className="oi-view oi-container" aria-labelledby="dashboard-title">
            <div className="oi-dashboard">
                <AccountSidebarNav />

                <div className="oi-dashboard__content">
                    {/* Welcome banner */}
                    <div className="oi-account-banner">
                        <span className="oi-avatar oi-avatar--lg" aria-hidden="true">
                            {user.initials}
                        </span>
                        <div>
                            <h1 id="dashboard-title" className="oi-account-banner__title">
                                Welcome back, {firstName}
                            </h1>
                            <p className="oi-account-banner__meta">
                                Member since {joined}
                            </p>
                        </div>
                    </div>

                    {/* Stat cards */}
                    <div className="oi-metrics">
                        <article className="oi-metric">
                            <small className="oi-metric__label">Orders placed</small>
                            <strong className="oi-metric__value">{ordersCount}</strong>
                        </article>
                        <article className="oi-metric">
                            <small className="oi-metric__label">Wishlist items</small>
                            <strong className="oi-metric__value">{wishlistCount}</strong>
                        </article>
                        <article className="oi-metric">
                            <small className="oi-metric__label">Reviews written</small>
                            <strong className="oi-metric__value">{reviewsCount}</strong>
                        </article>
                    </div>

                    {/* Recent orders */}
                    <article className="oi-dash-card">
                        <div className="oi-card-head">
                            <h3 className="oi-card-head__title">Recent orders</h3>
                            <Link href="/orders" className="oi-card-head__link">
                                View all →
                            </Link>
                        </div>
                        {recentOrders.length === 0 ? (
                            <p className="oi-muted">No orders yet.</p>
                        ) : (
                            <div className="oi-table-wrap">
                                <table className="oi-table">
                                    <thead>
                                        <tr>
                                            <th>ORDER</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>
                                                    <Link href={`/orders/${order.id}`}>
                                                        {order.id}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {new Date(order.date).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </td>
                                                <td>
                                                    ₦
                                                    {order.subtotal.toLocaleString("en-NG")}
                                                </td>
                                                <td>
                                                    <Badge
                                                        tone={
                                                            statusTone[order.status] ?? "neutral"
                                                        }
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </section>
    );
}
