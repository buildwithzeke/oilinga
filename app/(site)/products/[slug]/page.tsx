import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/marketplace/AddToCart";
import { ProductGrid } from "@/components/marketplace/ProductCard";
import { ProductReviews } from "@/components/marketplace/ProductReviews";
import { ShopCard } from "@/components/marketplace/ShopCard";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/cn";
import {
    getCategoryName,
    getProduct,
    getShop,
    products,
    relatedProducts,
} from "@/lib/data";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProduct(slug);

    if (!product) return { title: "Product not found" };

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: `${product.name} · Oilinga`,
            description: product.description,
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProduct(slug);

    if (!product) notFound();

    const shop = getShop(product.shopSlug);
    const related = relatedProducts(product);
    const lowStock = product.stock <= 6;

    return (
        <section className="oi-view oi-container" aria-labelledby="product-title">
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Marketplace", href: "/marketplace" },
                    { label: product.name },
                ]}
            />

            <div className="oi-pdp">
                <div className={cn("oi-pdp__media", `oi-pdp__media--${product.art}`)}>
                    <Badge tone="neutral" className="oi-pdp__tag">
                        {product.tag}
                    </Badge>
                    <span className="oi-pdp__glyph" aria-hidden="true">
                        {product.glyph}
                    </span>
                    <span className="oi-pdp__size-badge">{product.size}</span>
                </div>

                <div className="oi-pdp__info">
                    <span className="oi-eyebrow oi-eyebrow--green">
                        {getCategoryName(product.category)}
                    </span>
                    <h1 id="product-title" className="oi-pdp__title">
                        {product.name}
                    </h1>
                    <div className="oi-pdp__rating">
                        <StarRating rating={product.rating} reviews={product.reviews} />
                        {shop && (
                            <span>
                                Sold by{" "}
                                <Link href={`/shops/${shop.slug}`}>{shop.name}</Link>
                            </span>
                        )}
                    </div>

                    <div className="oi-pdp__price-row">
                        <strong className="oi-pdp__price">{product.price}</strong>
                        <Badge tone={lowStock ? "pending" : "green"}>
                            {lowStock ? `Only ${product.stock} left` : "In stock"}
                        </Badge>
                    </div>

                    <p className="oi-pdp__description">{product.description}</p>

                    <dl className="oi-pdp__facts">
                        <div>
                            <dt>Size</dt>
                            <dd>{product.size}</dd>
                        </div>
                        <div>
                            <dt>Origin</dt>
                            <dd>{product.origin}</dd>
                        </div>
                        <div>
                            <dt>Category</dt>
                            <dd>{getCategoryName(product.category)}</dd>
                        </div>
                        <div>
                            <dt>Available</dt>
                            <dd>{product.stock} units</dd>
                        </div>
                    </dl>

                    <AddToCart product={product} />

                    <ul className="oi-pdp__assurances">
                        <li>
                            <Icon name="truck" size={16} />
                            Delivered from {product.origin}
                        </li>
                        <li>
                            <Icon name="shield" size={16} />
                            Secure checkout and buyer protection
                        </li>
                        <li>
                            <Icon name="headset" size={16} />
                            Support from the Oilinga team
                        </li>
                    </ul>
                </div>
            </div>

            {shop && (
                <div className="oi-pdp__shop">
                    <div>
                        <span className="oi-eyebrow oi-eyebrow--green">The producer</span>
                        <h2>Meet {shop.name}</h2>
                        <p>{shop.tagline}</p>
                    </div>
                    <ShopCard shop={shop} />
                </div>
            )}

            <Section
                eyebrow="You might also like"
                title="Related products"
                action={
                    <Link className="oi-section__action" href="/marketplace">
                        See all products →
                    </Link>
                }
            >
                <ProductGrid products={related} />
            </Section>

            <ProductReviews productSlug={product.slug} productName={product.name} />

            <div className="oi-pdp__back">
                <ButtonLink href="/marketplace" variant="outline" size="sm">
                    <Icon name="arrow-left" size={14} />
                    Back to marketplace
                </ButtonLink>
            </div>
        </section>
    );
}
