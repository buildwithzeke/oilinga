import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/marketplace/ProductCard";
import { ShopGrid } from "@/components/marketplace/ShopCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/cn";
import { getShop, otherShops, productsForShop, shops } from "@/lib/data";

interface ShopPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return shops.map((shop) => ({ slug: shop.slug }));
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
    const { slug } = await params;
    const shop = getShop(slug);

    if (!shop) return { title: "Shop not found" };

    return {
        title: shop.name,
        description: shop.tagline,
        openGraph: {
            title: `${shop.name} · Oilinga`,
            description: shop.tagline,
        },
    };
}

export default async function ShopPage({ params }: ShopPageProps) {
    const { slug } = await params;
    const shop = getShop(slug);

    if (!shop) notFound();

    const items = productsForShop(shop.slug);
    const others = otherShops(shop.slug, 3);

    return (
        <section className="oi-view oi-container" aria-labelledby="shop-title">
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Shops", href: "/shops" },
                    { label: shop.name },
                ]}
            />

            <div className="oi-storefront">
                <span
                    className={cn("oi-storefront__mark", `oi-storefront__mark--${shop.accent}`)}
                    aria-hidden="true"
                >
                    {shop.initials}
                </span>

                <div className="oi-storefront__intro">
                    <div className="oi-storefront__flags">
                        {shop.verified && (
                            <Badge tone="green">
                                <Icon name="check" size={11} />
                                Verified seller
                            </Badge>
                        )}
                        <Badge tone="neutral">Since {shop.since}</Badge>
                        {shop.specialties.map((specialty) => (
                            <Badge key={specialty} tone="gold">
                                {specialty}
                            </Badge>
                        ))}
                    </div>
                    <h1 id="shop-title" className="oi-storefront__title">
                        {shop.name}
                    </h1>
                    <p className="oi-storefront__tagline">{shop.tagline}</p>
                    <div className="oi-storefront__meta">
                        <span>
                            <Icon name="pin" size={14} />
                            {shop.location}
                        </span>
                        <StarRating rating={shop.rating} reviews={shop.reviews} />
                    </div>
                    <p className="oi-storefront__description">{shop.description}</p>
                    <div className="oi-storefront__actions">
                        <ButtonLink href="#shop-products" variant="primary" size="sm">
                            Shop this storefront
                            <Icon name="arrow-right" size={14} />
                        </ButtonLink>
                        <Link
                            href={`/marketplace?q=${encodeURIComponent(shop.name)}`}
                            className="oi-btn oi-btn--outline oi-btn--sm"
                        >
                            Find on marketplace
                        </Link>
                    </div>
                </div>

                <div className="oi-storefront__stats">
                    <div>
                        <strong>{items.length}</strong>
                        <small>{items.length === 1 ? "Product" : "Products"}</small>
                    </div>
                    <div>
                        <strong>{shop.rating.toFixed(1)}</strong>
                        <small>Shop rating</small>
                    </div>
                    <div>
                        <strong>{shop.reviews}</strong>
                        <small>Reviews</small>
                    </div>
                </div>
            </div>

            <div id="shop-products" className="oi-storefront__section">
                <Section
                    eyebrow="Straight from the producer"
                    title={`Products from ${shop.name}`}
                    action={
                        <Link
                            className="oi-section__action"
                            href={`/marketplace?q=${encodeURIComponent(shop.name)}`}
                        >
                            View on marketplace →
                        </Link>
                    }
                >
                    {items.length > 0 ? (
                        <ProductGrid products={items} compact />
                    ) : (
                        <div className="oi-empty oi-empty--card">
                            <h3>This shop is preparing its next pressing run</h3>
                            <p>New products will appear here soon.</p>
                        </div>
                    )}
                </Section>
            </div>

            <Section
                eyebrow="Keep exploring"
                title="Other shops to know"
                action={
                    <Link className="oi-section__action" href="/shops">
                        All shops →
                    </Link>
                }
            >
                <ShopGrid shops={others} />
            </Section>
        </section>
    );
}
