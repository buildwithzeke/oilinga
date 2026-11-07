"use client";

import type { Order } from "@/lib/data";
import { recentOrders, sellerMetrics, sellerNav, topProducts } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";

const statusTone: Record<Order["status"], BadgeTone> = {
    Processing: "pending",
    Shipped: "shipped",
    Delivered: "delivered",
};

function SalesChart() {
    return (
        <>
            <div className="oi-chart">
                <div className="oi-chart__y" aria-hidden="true">
                    <span>₦200k</span>
                    <span>₦150k</span>
                    <span>₦100k</span>
                    <span>₦50k</span>
                </div>
                <svg
                    viewBox="0 0 600 170"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Sales rising through the week"
                >
                    <defs>
                        <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" stopColor="#234b36" stopOpacity=".22" />
                            <stop offset="1" stopColor="#234b36" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0 132 C45 125 50 104 95 110 S150 130 190 85 S240 97 285 70 S340 98 380 65 S430 87 475 43 S540 52 600 14 L600 170 L0 170Z"
                        fill="url(#sales-fill)"
                    />
                    <path
                        d="M0 132 C45 125 50 104 95 110 S150 130 190 85 S240 97 285 70 S340 98 380 65 S430 87 475 43 S540 52 600 14"
                        fill="none"
                        stroke="#234b36"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <div className="oi-chart__x" aria-hidden="true">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        </>
    );
}

export function SellerDashboard() {
    const notify = useToast();

    return (
        <section className="oi-view oi-container" aria-labelledby="dashboard-title">
            <div className="oi-dashboard">
                <aside className="oi-sidebar">
                    <div className="oi-sidebar__brand">
                        <Logo size="sm" alt="Oilinga" />
                    </div>
                    <small className="oi-sidebar__label">SELLER PORTAL</small>
                    <nav className="oi-sidebar__nav" aria-label="Seller portal">
                        {sellerNav.map((item, index) => (
                            <button
                                key={item.label}
                                type="button"
                                className={cn("oi-sidebar__link", index === 0 && "is-active")}
                                onClick={() => notify(`${item.label} is coming soon`)}
                            >
                                <Icon name={item.icon} size={16} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <div className="oi-sidebar__profile">
                        <span className="oi-avatar">AO</span>
                        <div className="oi-sidebar__profile-text">
                            <b className="oi-sidebar__profile-name">Agro Oils Ltd.</b>
                            <small className="oi-sidebar__profile-meta">Verified seller</small>
                        </div>
                    </div>
                </aside>

                <div className="oi-dashboard__content">
                    <div className="oi-dashboard__top">
                        <div>
                            <small className="oi-dashboard__date">TODAY · SELLER DASHBOARD</small>
                            <h1 id="dashboard-title" className="oi-dashboard__title">
                                Good morning, Amina <span aria-hidden="true">☀</span>
                            </h1>
                            <p className="oi-dashboard__lede">
                                Here’s what’s happening with your shop today.
                            </p>
                        </div>
                        <Button
                            variant="gold"
                            onClick={() => notify("Add product flow is coming soon")}
                        >
                            <Icon name="plus" size={16} />
                            Add product
                        </Button>
                    </div>

                    <div className="oi-trial-note">
                        <span className="oi-trial-note__icon" aria-hidden="true">
                            ✦
                        </span>
                        <div className="oi-trial-note__text">
                            <b className="oi-trial-note__title">Your free trial is active</b>
                            <small className="oi-trial-note__caption">
                                12 days remaining · Your trial started when your shop was
                                approved.
                            </small>
                        </div>
                        <button
                            type="button"
                            className="oi-trial-note__link"
                            onClick={() => notify("Subscription plans are coming soon")}
                        >
                            View plans →
                        </button>
                    </div>

                    <div className="oi-metrics">
                        {sellerMetrics.map((metric) => (
                            <article className="oi-metric" key={metric.label}>
                                <small className="oi-metric__label">{metric.label}</small>
                                <strong className="oi-metric__value">{metric.value}</strong>
                                <span
                                    className={cn("oi-metric__trend", metric.up && "is-up")}
                                >
                                    {metric.trend}
                                </span>
                            </article>
                        ))}
                    </div>

                    <div className="oi-dash-grid">
                        <article className="oi-dash-card oi-chart-card">
                            <div className="oi-card-head">
                                <div>
                                    <h3 className="oi-card-head__title">Sales performance</h3>
                                    <small className="oi-card-head__caption">
                                        Your revenue over the last 7 days
                                    </small>
                                </div>
                                <select aria-label="Sales period">
                                    <option>This week</option>
                                </select>
                            </div>
                            <SalesChart />
                        </article>

                        <article className="oi-dash-card">
                            <div className="oi-card-head">
                                <div>
                                    <h3 className="oi-card-head__title">Top products</h3>
                                    <small className="oi-card-head__caption">By units sold</small>
                                </div>
                                <button
                                    type="button"
                                    className="oi-card-head__link"
                                    onClick={() => notify("Product analytics are coming soon")}
                                >
                                    See all →
                                </button>
                            </div>
                            {topProducts.map((product) => (
                                <div className="oi-top-product" key={product.id}>
                                    <span
                                        className={cn(
                                            "oi-top-product__art",
                                            `oi-top-product__art--${product.art}`,
                                        )}
                                        aria-hidden="true"
                                    >
                                        {product.glyph}
                                    </span>
                                    <div className="oi-top-product__text">
                                        <b className="oi-top-product__name">{product.name}</b>
                                        <small className="oi-top-product__meta">
                                            {product.sold} sold
                                        </small>
                                    </div>
                                    <strong className="oi-top-product__value">
                                        {product.revenue}
                                    </strong>
                                </div>
                            ))}
                        </article>

                        <article className="oi-dash-card oi-dash-card--orders">
                            <div className="oi-card-head">
                                <div>
                                    <h3 className="oi-card-head__title">Recent orders</h3>
                                    <small className="oi-card-head__caption">
                                        Latest customer orders
                                    </small>
                                </div>
                                <button
                                    type="button"
                                    className="oi-card-head__link"
                                    onClick={() => notify("The orders workspace is coming soon")}
                                >
                                    View orders →
                                </button>
                            </div>
                            <div className="oi-table-wrap">
                                <table className="oi-table">
                                    <thead>
                                        <tr>
                                            <th>ORDER</th>
                                            <th>CUSTOMER</th>
                                            <th>DATE</th>
                                            <th>AMOUNT</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.customer}</td>
                                                <td>{order.date}</td>
                                                <td>{order.amount}</td>
                                                <td>
                                                    <Badge tone={statusTone[order.status]}>
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </article>

                        <article className="oi-dash-card">
                            <div className="oi-card-head">
                                <div>
                                    <h3 className="oi-card-head__title">Inventory alerts</h3>
                                    <small className="oi-card-head__caption">
                                        Products running low
                                    </small>
                                </div>
                                <button
                                    type="button"
                                    className="oi-card-head__link"
                                    onClick={() => notify("Inventory management is coming soon")}
                                >
                                    Manage inventory →
                                </button>
                            </div>
                            <p className="oi-inventory-item">
                                <span className="oi-alert-dot" />
                                <span>Pure Palm Kernel Oil</span>
                                <b>Only 4 left</b>
                            </p>
                            <p className="oi-inventory-item">
                                <span className="oi-alert-dot oi-alert-dot--gold" />
                                <span>Cold-Pressed Groundnut Oil</span>
                                <b>Only 8 left</b>
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
