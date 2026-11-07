import Link from "next/link";
import type { Metadata } from "next";
import { FilterPanel } from "@/components/marketplace/FilterPanel";
import { ProductGrid } from "@/components/marketplace/ProductCard";
import { QuerySelect } from "@/components/marketplace/QuerySelect";
import { RouteSearch } from "@/components/marketplace/RouteSearch";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import {
    categories,
    categoryCounts,
    filterProducts,
    getCategory,
    getShop,
    products,
} from "@/lib/data";
import { buildHref, first, parseNumber, type QueryValue } from "@/lib/search-params";

export const metadata: Metadata = {
    title: "Marketplace",
    description:
        "Browse palm oil, groundnut oil, palm kernel oil and wholesale sizes from verified producers across Africa.",
};

const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "rating", label: "Top rated" },
];

interface MarketplacePageProps {
    searchParams: Promise<Record<string, QueryValue>>;
}

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
    const params = await searchParams;
    const q = first(params.q) ?? "";
    const category = first(params.category) ?? "all";
    const sort = first(params.sort) ?? "recommended";
    const min = parseNumber(params.min);
    const max = parseNumber(params.max);
    const verified = first(params.verified) === "1";

    const results = filterProducts({ q, category, sort, min, max, verified });
    const activeCategory = getCategory(category);
    const counts = categoryCounts();

    const verifiedProducts = products.filter(
        (product) => getShop(product.shopSlug)?.verified,
    ).length;

    const baseQuery = {
        q,
        category: category !== "all" ? category : undefined,
        sort: sort !== "recommended" ? sort : undefined,
        min,
        max,
        verified: verified ? "1" : undefined,
    };

    const hasFilters =
        Boolean(q) || category !== "all" || min !== undefined || max !== undefined || verified;

    return (
        <section className="oi-view oi-container" aria-labelledby="marketplace-title">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Marketplace" }]} />

            <div className="oi-page-heading">
                <div>
                    <span className="oi-eyebrow oi-eyebrow--green">Discover Oilinga</span>
                    <h1 id="marketplace-title" className="oi-page-heading__title">
                        Marketplace
                    </h1>
                    <p className="oi-page-heading__lede">
                        Shop palm oil and groundnut oil from trusted sellers.
                    </p>
                </div>
                <RouteSearch
                    basePath="/marketplace"
                    size="lg"
                    placeholder="Search oils or shops…"
                    className="oi-market-search"
                    defaultValue={q}
                    keep={{
                        category: category !== "all" ? category : undefined,
                        sort: sort !== "recommended" ? sort : undefined,
                        min,
                        max,
                        verified: verified ? "1" : undefined,
                    }}
                />
            </div>

            <div className="oi-market-layout">
                <FilterPanel>
                    <fieldset className="oi-filters__group">
                        <legend className="oi-filters__legend">Categories</legend>
                        <Link
                            href={buildHref("/marketplace", { ...baseQuery, category: undefined })}
                            className="oi-filters__link"
                            aria-current={category === "all" ? "true" : undefined}
                        >
                            All products
                            <span className="oi-filters__count">{products.length}</span>
                        </Link>
                        {categories.map((item) => (
                            <Link
                                key={item.id}
                                href={buildHref("/marketplace", {
                                    ...baseQuery,
                                    category: item.id,
                                })}
                                className="oi-filters__link"
                                aria-current={category === item.id ? "true" : undefined}
                            >
                                {item.name}
                                <span className="oi-filters__count">{counts[item.id]}</span>
                            </Link>
                        ))}
                    </fieldset>

                    <hr className="oi-filters__divider" />

                    <form className="oi-filter-form" action="/marketplace" method="get">
                        {q && <input type="hidden" name="q" value={q} />}
                        {category !== "all" && (
                            <input type="hidden" name="category" value={category} />
                        )}
                        {sort !== "recommended" && (
                            <input type="hidden" name="sort" value={sort} />
                        )}
                        {verified && <input type="hidden" name="verified" value="1" />}
                        <fieldset className="oi-filters__group">
                            <legend className="oi-filters__legend">Price range</legend>
                            <div className="oi-price-range">
                                <input
                                    name="min"
                                    inputMode="numeric"
                                    placeholder="Min ₦"
                                    aria-label="Minimum price in naira"
                                    defaultValue={min ?? ""}
                                />
                                <input
                                    name="max"
                                    inputMode="numeric"
                                    placeholder="Max ₦"
                                    aria-label="Maximum price in naira"
                                    defaultValue={max ?? ""}
                                />
                            </div>
                            <button type="submit" className="oi-btn oi-btn--primary oi-btn--sm oi-btn--block">
                                Apply price
                            </button>
                        </fieldset>
                    </form>

                    <hr className="oi-filters__divider" />

                    <fieldset className="oi-filters__group">
                        <legend className="oi-filters__legend">Trust</legend>
                        <Link
                            href={buildHref("/marketplace", {
                                ...baseQuery,
                                verified: verified ? undefined : "1",
                            })}
                            className="oi-filters__link"
                            aria-current={verified ? "true" : undefined}
                        >
                            Verified sellers only
                            <span className="oi-filters__count">{verifiedProducts}</span>
                        </Link>
                    </fieldset>

                    {hasFilters && (
                        <>
                            <hr className="oi-filters__divider" />
                            <Link href="/marketplace" className="oi-filters__clear">
                                Clear all filters
                            </Link>
                        </>
                    )}
                </FilterPanel>

                <div>
                    <div className="oi-result-bar">
                        <span>
                            Showing <b>{results.length}</b>{" "}
                            {results.length === 1 ? "product" : "products"}
                            {activeCategory && category !== "all" && (
                                <> in <b>{activeCategory.name}</b></>
                            )}
                            {q && (
                                <> for <b>“{q}”</b></>
                            )}
                        </span>
                        <QuerySelect
                            label="Sort products"
                            basePath="/marketplace"
                            param="sort"
                            value={sort}
                            options={sortOptions}
                            keep={{
                                q,
                                category: category !== "all" ? category : undefined,
                                min,
                                max,
                                verified: verified ? "1" : undefined,
                            }}
                        />
                    </div>

                    {results.length > 0 ? (
                        <ProductGrid products={results} compact />
                    ) : (
                        <div className="oi-empty oi-empty--card">
                            <span className="oi-empty__icon" aria-hidden="true">
                                <Icon name="search" size={28} />
                            </span>
                            <h3>No products match those filters</h3>
                            <p>
                                Try a different search term, widen the price range, or clear the
                                filters to see the whole marketplace.
                            </p>
                            <ButtonLink href="/marketplace" variant="primary" size="sm">
                                Clear filters
                            </ButtonLink>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
