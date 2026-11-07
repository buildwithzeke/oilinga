"use client";

import type { Page, Product } from "@/lib/data";
import { categories, products } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { CategoryGrid } from "@/components/marketplace/CategoryGrid";
import { ProductGrid } from "@/components/marketplace/ProductCard";
import { SellerBanner } from "@/components/marketplace/SellerBanner";
import { TrustRow } from "@/components/marketplace/TrustRow";

export interface HomeViewProps {
    onNavigate: (page: Page) => void;
    onAdd: (product: Product) => void;
}

export function HomeView({ onNavigate, onAdd }: HomeViewProps) {
    return (
        <div className="oi-view oi-container">
            <section className="oi-hero" aria-labelledby="hero-title">
                <div className="oi-hero__copy">
                    <span className="oi-eyebrow">Africa’s marketplace for quality oils</span>
                    <h1 id="hero-title" className="oi-hero__title">
                        Buy, sell and grow{" "}
                        <br />
                        with <em>Oilinga</em>
                    </h1>
                    <p className="oi-hero__lede">
                        Connecting palm oil and groundnut oil sellers, retailers and consumers
                        across Africa.
                    </p>
                    <div className="oi-hero__actions">
                        <Button variant="gold" onClick={() => onNavigate("marketplace")}>
                            Start shopping
                            <Icon name="arrow-right" size={16} />
                        </Button>
                        <Button variant="glass" onClick={() => onNavigate("seller")}>
                            Become a seller
                        </Button>
                    </div>
                    <div className="oi-hero__proof">
                        <span>✦ Verified local sellers</span>
                        <span>✦ Secure checkout</span>
                    </div>
                </div>
                <div className="oi-hero__photo">
                    <img
                        src="/assets/brand/oilinga-brand-visual-reference.png"
                        alt="Oilinga marketplace brand vision"
                    />
                </div>
            </section>

            <TrustRow />

            <Section
                eyebrow="Explore the marketplace"
                title="Shop by category"
                action={
                    <a
                        className="oi-section__action"
                        href="#marketplace"
                        onClick={(event) => {
                            event.preventDefault();
                            onNavigate("marketplace");
                        }}
                    >
                        View all categories →
                    </a>
                }
            >
                <CategoryGrid
                    categories={categories}
                    onSelect={() => onNavigate("marketplace")}
                />
            </Section>

            <Section
                eyebrow="Picked for you"
                title="Featured products"
                action={
                    <a
                        className="oi-section__action"
                        href="#marketplace"
                        onClick={(event) => {
                            event.preventDefault();
                            onNavigate("marketplace");
                        }}
                    >
                        Explore marketplace →
                    </a>
                }
            >
                <ProductGrid products={products} onAdd={onAdd} />
            </Section>

            <SellerBanner onNavigate={onNavigate} />
        </div>
    );
}
