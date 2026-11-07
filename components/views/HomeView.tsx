import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { CategoryGrid } from "@/components/marketplace/CategoryGrid";
import { ProductGrid } from "@/components/marketplace/ProductCard";
import { SellerBanner } from "@/components/marketplace/SellerBanner";
import { ShopGrid } from "@/components/marketplace/ShopCard";
import { RouteSearch } from "@/components/marketplace/RouteSearch";
import { TrustRow } from "@/components/marketplace/TrustRow";
import {
    categories,
    featuredProducts,
    featuredShops,
    popularSearches,
} from "@/lib/data";

export function HomeView() {
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
                    <div className="oi-hero__search">
                        <RouteSearch
                            basePath="/marketplace"
                            size="lg"
                            placeholder="Search oils, shops or locations…"
                            label="Search the marketplace"
                        />
                    </div>
                    <div className="oi-hero__actions">
                        <ButtonLink href="/marketplace" variant="gold">
                            Start shopping
                            <Icon name="arrow-right" size={16} />
                        </ButtonLink>
                        <ButtonLink href="/seller" variant="glass">
                            Become a seller
                        </ButtonLink>
                    </div>
                    <div className="oi-hero__proof">
                        <span>✦ Verified local sellers</span>
                        <span>✦ Secure checkout</span>
                    </div>
                </div>
                <div className="oi-hero__photo">
                    <Image
                        src="/assets/brand/oilinga-brand-visual-reference.png"
                        alt="Oilinga marketplace brand vision"
                        fill
                        style={{ objectFit: "cover", objectPosition: "42% 55%" }}
                    />
                </div>
            </section>

            <div className="oi-popular">
                <span className="oi-popular__label">Popular right now</span>
                {popularSearches.map((term) => (
                    <Link
                        key={term}
                        href={`/marketplace?q=${encodeURIComponent(term)}`}
                        className="oi-popular__chip"
                    >
                        {term}
                    </Link>
                ))}
            </div>

            <TrustRow />

            <Section
                eyebrow="Explore the marketplace"
                title="Shop by category"
                action={
                    <Link className="oi-section__action" href="/marketplace">
                        Browse all products →
                    </Link>
                }
            >
                <CategoryGrid categories={categories} />
            </Section>

            <Section
                eyebrow="Meet the makers"
                title="Shops to know"
                action={
                    <Link className="oi-section__action" href="/shops">
                        View the shop directory →
                    </Link>
                }
            >
                <ShopGrid shops={featuredShops} />
            </Section>

            <Section
                eyebrow="Picked for you"
                title="Featured products"
                action={
                    <Link className="oi-section__action" href="/marketplace">
                        Explore marketplace →
                    </Link>
                }
            >
                <ProductGrid products={featuredProducts} />
            </Section>

            <SellerBanner />
        </div>
    );
}
