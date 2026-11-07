"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { marketplaceFilters, products, shopTypes } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SearchField } from "@/components/ui/SearchField";
import { useToast } from "@/components/ui/Toast";
import { ProductGrid } from "@/components/marketplace/ProductCard";

export interface MarketplaceViewProps {
    onAdd: (product: Product) => void;
}

function MarketplaceFilters() {
    const [open, setOpen] = useState(false);
    const notify = useToast();

    return (
        <aside className="oi-filters" aria-label="Marketplace filters">
            <button
                type="button"
                className="oi-filters__summary"
                aria-expanded={open}
                aria-controls="marketplace-filters"
                onClick={() => setOpen((value) => !value)}
            >
                <span>Filters</span>
                <Icon name="chevron-down" size={18} />
            </button>

            <div
                id="marketplace-filters"
                className={cn("oi-filters__body", open && "is-open")}
            >
                <fieldset className="oi-filters__group">
                    <legend className="oi-filters__legend">Categories</legend>
                    {marketplaceFilters.map((filter, index) => (
                        <label className="oi-filters__option" key={filter.id}>
                            <input type="checkbox" defaultChecked={index === 0} />
                            {filter.name}
                            <span className="oi-filters__count">{filter.count}</span>
                        </label>
                    ))}
                </fieldset>

                <hr className="oi-filters__divider" />

                <fieldset className="oi-filters__group">
                    <legend className="oi-filters__legend">Shop type</legend>
                    {shopTypes.map((shopType) => (
                        <label className="oi-filters__option" key={shopType.id}>
                            <input type="checkbox" />
                            {shopType.name}
                        </label>
                    ))}
                </fieldset>

                <hr className="oi-filters__divider" />

                <fieldset className="oi-filters__group">
                    <legend className="oi-filters__legend">Price range</legend>
                    <div className="oi-price-range">
                        <input placeholder="Min ₦" aria-label="Minimum price" />
                        <input placeholder="Max ₦" aria-label="Maximum price" />
                    </div>
                </fieldset>

                <Button
                    variant="primary"
                    size="sm"
                    block
                    onClick={() => notify("Marketplace filters updated")}
                >
                    Apply filters
                </Button>
            </div>
        </aside>
    );
}

export function MarketplaceView({ onAdd }: MarketplaceViewProps) {
    const notify = useToast();

    return (
        <section className="oi-view oi-container" aria-labelledby="marketplace-title">
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
                <SearchField
                    size="lg"
                    placeholder="Search oils or shops…"
                    className="oi-market-search"
                    onSubmit={() => notify("Showing matching marketplace products")}
                />
            </div>

            <div className="oi-market-layout">
                <MarketplaceFilters />

                <div>
                    <div className="oi-result-bar">
                        <span>
                            Showing <b>128 products</b>
                        </span>
                        <select aria-label="Sort products">
                            <option>Recommended</option>
                            <option>Price: low to high</option>
                            <option>Top rated</option>
                        </select>
                    </div>

                    <ProductGrid products={products} onAdd={onAdd} compact />
                </div>
            </div>
        </section>
    );
}
