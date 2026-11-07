import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SearchField } from "@/components/ui/SearchField";
import { CategoryGrid } from "@/components/marketplace/CategoryGrid";
import { ProductGrid } from "@/components/marketplace/ProductCard";
import { ShopGrid } from "@/components/marketplace/ShopCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StarRating } from "@/components/ui/StarRating";
import { categories, featuredShops, products } from "@/lib/data";

export const metadata: Metadata = {
    title: "Design system",
    description:
        "The Oilinga design system: brand colours, typography, components, spacing and responsive foundations.",
};

const brandColours = [
    { name: "Deep Green", token: "--oilinga-deep-green", value: "#234B36" },
    { name: "Harvest Gold", token: "--oilinga-harvest-gold", value: "#D99A32" },
    { name: "Palm Red", token: "--oilinga-palm-red", value: "#741F18" },
    { name: "Warm Cream", token: "--oilinga-warm-cream", value: "#FFF4E7" },
    { name: "Charcoal", token: "--oilinga-charcoal", value: "#282522" },
];

const semanticColours = [
    { name: "Primary", token: "--color-primary", value: "#234B36" },
    { name: "Accent", token: "--color-accent", value: "#D99A32" },
    { name: "Danger", token: "--color-danger", value: "#741F18" },
    { name: "Surface", token: "--color-surface", value: "#FFFDFA" },
    { name: "Background", token: "--color-bg", value: "#FFF4E7" },
    { name: "Text", token: "--color-text", value: "#282522" },
    { name: "Text muted", token: "--color-text-muted", value: "#6E6A61" },
    { name: "Border", token: "--color-border", value: "#ECE5DA" },
];

const radii = [
    { name: "sm", token: "--radius-sm" },
    { name: "md", token: "--radius-md" },
    { name: "lg", token: "--radius-lg" },
    { name: "xl", token: "--radius-xl" },
    { name: "pill", token: "--radius-pill" },
];

const iconNames: IconName[] = [
    "search",
    "heart",
    "bag",
    "store",
    "drop",
    "truck",
    "leaf",
    "shield",
    "headset",
    "grid",
    "box",
    "receipt",
    "archive",
    "wallet",
    "sparkle",
    "settings",
    "user",
    "sun",
    "plus",
    "check",
    "arrow-right",
    "chevron-down",
    "chevron-right",
    "star",
    "pin",
    "eye",
    "eye-off",
    "mail",
    "lock",
    "calendar",
    "filter",
    "package",
    "arrow-left",
    "logout",
];

function ColourSwatches({
    colours,
}: {
    colours: Array<{ name: string; token: string; value: string }>;
}) {
    return (
        <div className="oi-ds__swatches">
            {colours.map((colour) => (
                <div className="oi-ds__swatch" key={colour.token}>
                    <div
                        className="oi-ds__swatch-color"
                        style={{ background: `var(${colour.token})` }}
                    />
                    <div className="oi-ds__swatch-body">
                        <span className="oi-ds__swatch-name">{colour.name}</span>
                        <span className="oi-ds__swatch-value">{colour.value}</span>
                        <span className="oi-ds__swatch-value">{colour.token}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function DesignSystemPage() {
    return (
        <div className="oi-ds">
            <header className="oi-ds__header">
                <div className="oi-container oi-ds__header-inner">
                    <a href="/" aria-label="Back to the Oilinga home page">
                        <Logo size="sm" />
                    </a>
                    <Badge tone="green">Phase 2 · Public website</Badge>
                </div>
            </header>

            <main className="oi-container oi-ds__main">
                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">01 · Brand</span>
                        <h2>Logo integration</h2>
                        <p>
                            The transparent Oilinga lockup is used at three sizes. The light
                            variant is reserved for the footer and dark green surfaces.
                        </p>
                    </div>
                    <div className="oi-ds__row">
                        <div className="oi-card oi-card--pad">
                            <Logo size="sm" />
                        </div>
                        <div className="oi-card oi-card--pad">
                            <Logo />
                        </div>
                        <div className="oi-card oi-card--pad">
                            <Logo size="lg" />
                        </div>
                        <div className="oi-ds__surface">
                            <Logo variant="light" />
                        </div>
                    </div>
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">02 · Colour</span>
                        <h2>Brand and semantic palettes</h2>
                        <p>
                            Components consume semantic aliases, never raw brand colours, so a
                            palette change stays contained.
                        </p>
                    </div>
                    <ColourSwatches colours={brandColours} />
                    <ColourSwatches colours={semanticColours} />
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">03 · Type</span>
                        <h2>Typography</h2>
                        <p>
                            Manrope for display and headings, DM Sans for body copy and UI
                            controls. Sizes are fluid where the layout demands it.
                        </p>
                    </div>
                    <div className="oi-ds__type">
                        <div className="oi-ds__type-row">
                            <span className="oi-ds__type-label">Display</span>
                            <span className="oi-ds__display">Buy, sell and grow</span>
                        </div>
                        <div className="oi-ds__type-row">
                            <span className="oi-ds__type-label">H2 / 26</span>
                            <span className="oi-ds__h2">Shop by category</span>
                        </div>
                        <div className="oi-ds__type-row">
                            <span className="oi-ds__type-label">H3 / 18</span>
                            <span className="oi-ds__h3">Premium Red Palm Oil</span>
                        </div>
                        <div className="oi-ds__type-row">
                            <span className="oi-ds__type-label">Body / 15</span>
                            <span className="oi-ds__body">
                                Connecting palm oil and groundnut oil sellers, retailers and
                                consumers across Africa.
                            </span>
                        </div>
                        <div className="oi-ds__type-row">
                            <span className="oi-ds__type-label">Caption / 11</span>
                            <span className="oi-ds__caption">
                                Verified seller · 5 litres · Freshly pressed
                            </span>
                        </div>
                        <div className="oi-ds__type-row">
                            <span className="oi-ds__type-label">Eyebrow</span>
                            <span className="oi-eyebrow oi-eyebrow--green">
                                Explore the marketplace
                            </span>
                        </div>
                    </div>
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">04 · Actions</span>
                        <h2>Buttons and badges</h2>
                        <p>
                            Six button variants, three sizes and semantic status badges. Focus
                            states use the harvest-gold ring.
                        </p>
                    </div>
                    <div className="oi-ds__row">
                        <Button>Primary</Button>
                        <Button variant="gold">Harvest gold</Button>
                        <Button variant="danger">Palm red</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="oi-ds__row">
                        <Button size="sm">Small</Button>
                        <Button>Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button disabled>Disabled</Button>
                    </div>
                    <div className="oi-ds__surface">
                        <Button variant="glass">Glass on green</Button>
                        <Button variant="gold">Gold on green</Button>
                    </div>
                    <div className="oi-ds__row">
                        <Badge>Bestseller</Badge>
                        <Badge tone="green">Verified</Badge>
                        <Badge tone="neutral">Local favourite</Badge>
                        <Badge tone="red">Low stock</Badge>
                        <Badge tone="blue">Shipped</Badge>
                        <Badge tone="pending">Processing</Badge>
                        <Badge tone="delivered">Delivered</Badge>
                    </div>
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">05 · Forms</span>
                        <h2>Inputs and search</h2>
                        <p>
                            Inputs share the same border, radius and focus treatment. Search
                            comes in a compact header size and a large marketplace size.
                        </p>
                    </div>
                    <div className="oi-ds__grid">
                        <div className="oi-field">
                            <label className="oi-field__label" htmlFor="ds-email">
                                Email address
                            </label>
                            <input
                                id="ds-email"
                                className="oi-input"
                                placeholder="you@example.com"
                            />
                            <small className="oi-field__hint">
                                We only use this to send order updates.
                            </small>
                        </div>
                        <div className="oi-field">
                            <span className="oi-field__label">Header search</span>
                            <SearchField placeholder="Search oils…" />
                        </div>
                        <div className="oi-field">
                            <span className="oi-field__label">Marketplace search</span>
                            <SearchField size="lg" placeholder="Search oils or shops…" />
                        </div>
                    </div>
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">06 · Components</span>
                        <h2>Cards, products and shops</h2>
                        <p>
                            Product, category and shop cards share the same hover lift, shadow
                            and focus treatment. Every product card links to its product page and
                            its producer&apos;s storefront.
                        </p>
                    </div>
                    <CategoryGrid categories={categories} />
                    <ProductGrid products={products.slice(0, 3)} compact />
                    <ShopGrid shops={featuredShops.slice(0, 3)} />
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">07 · Discovery</span>
                        <h2>Breadcrumbs, ratings and filters</h2>
                        <p>
                            Marketplace discovery uses URL search parameters, so filters and
                            sorting are linkable and survive a page refresh.
                        </p>
                    </div>
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Marketplace", href: "/marketplace" },
                            { label: "Premium Red Palm Oil" },
                        ]}
                    />
                    <div className="oi-ds__row">
                        <StarRating rating={4.9} reviews={128} />
                        <StarRating rating={4.6} />
                        <span className="oi-chip" aria-current="true">
                            Crude palm oil
                        </span>
                        <span className="oi-chip">Groundnut oil</span>
                        <span className="oi-chip">Wholesale</span>
                    </div>
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">08 · Icons</span>
                        <h2>Icon set</h2>
                        <p>
                            A single inline SVG set keeps icons crisp, themeable and available
                            offline. Icons inherit <code>currentColor</code>.
                        </p>
                    </div>
                    <div className="oi-ds__row">
                        {iconNames.map((name) => (
                            <span className="oi-icon-btn" key={name} title={name}>
                                <Icon name={name} size={18} />
                            </span>
                        ))}
                    </div>
                </section>

                <section className="oi-ds__section">
                    <div className="oi-ds__section-head">
                        <span className="oi-eyebrow oi-eyebrow--green">09 · Space</span>
                        <h2>Radius and spacing</h2>
                        <p>
                            A 4px spacing scale and a five-step radius scale keep rhythm
                            consistent across pages.
                        </p>
                    </div>
                    <div className="oi-ds__swatches">
                        {radii.map((radius) => (
                            <div className="oi-ds__swatch" key={radius.token}>
                                <div
                                    className="oi-ds__swatch-color"
                                    style={{
                                        background: "var(--green-100)",
                                        borderRadius: `var(${radius.token})`,
                                    }}
                                />
                                <div className="oi-ds__swatch-body">
                                    <span className="oi-ds__swatch-name">{radius.name}</span>
                                    <span className="oi-ds__swatch-value">{radius.token}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="oi-ds__note">
                        Breakpoints: 480px (small), 760px (mobile layouts), 900px (navigation
                        collapses), 1024px (compact desktop), 1280px and up (wide). Resize this
                        window to see the header, marketplace filters and seller dashboard adapt.
                    </p>
                </section>
            </main>
        </div>
    );
}
