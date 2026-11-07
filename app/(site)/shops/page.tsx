import Link from "next/link";
import type { Metadata } from "next";
import { RouteSearch } from "@/components/marketplace/RouteSearch";
import { ShopGrid } from "@/components/marketplace/ShopCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { categories, filterShops, shops } from "@/lib/data";
import { buildHref, first, type QueryValue } from "@/lib/search-params";

export const metadata: Metadata = {
    title: "Shops",
    description:
        "Meet the producers, farms and co-operatives behind every bottle on Oilinga.",
};

interface ShopsPageProps {
    searchParams: Promise<Record<string, QueryValue>>;
}

export default async function ShopsPage({ searchParams }: ShopsPageProps) {
    const params = await searchParams;
    const q = first(params.q) ?? "";
    const category = first(params.category) ?? "all";
    const results = filterShops({ q, category });

    return (
        <section className="oi-view oi-container" aria-labelledby="shops-title">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shops" }]} />

            <div className="oi-page-heading">
                <div>
                    <span className="oi-eyebrow oi-eyebrow--green">The people behind the oil</span>
                    <h1 id="shops-title" className="oi-page-heading__title">
                        Shop directory
                    </h1>
                    <p className="oi-page-heading__lede">
                        Browse verified producers, family farms and co-operatives across Africa.
                    </p>
                </div>
                <RouteSearch
                    basePath="/shops"
                    size="lg"
                    placeholder="Search shops or locations…"
                    label="Search shops"
                    defaultValue={q}
                    keep={{ category: category !== "all" ? category : undefined }}
                    className="oi-market-search"
                />
            </div>

            <div className="oi-chip-row" aria-label="Filter shops by category">
                <Link
                    href={buildHref("/shops", { q, category: undefined })}
                    className="oi-chip"
                    aria-current={category === "all" ? "true" : undefined}
                >
                    All shops
                </Link>
                {categories.map((item) => (
                    <Link
                        key={item.id}
                        href={buildHref("/shops", { q, category: item.id })}
                        className="oi-chip"
                        aria-current={category === item.id ? "true" : undefined}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="oi-result-bar">
                <span>
                    Showing <b>{results.length}</b>{" "}
                    {results.length === 1 ? "shop" : "shops"} of {shops.length}
                </span>
                {(q || category !== "all") && (
                    <Link href="/shops" className="oi-result-bar__reset">
                        Reset
                    </Link>
                )}
            </div>

            {results.length > 0 ? (
                <ShopGrid shops={results} />
            ) : (
                <div className="oi-empty oi-empty--card">
                    <span className="oi-empty__icon" aria-hidden="true">
                        <Icon name="store" size={28} />
                    </span>
                    <h3>No shops match that search</h3>
                    <p>
                        Try another location or oil type, or browse the full directory to meet
                        every producer on Oilinga.
                    </p>
                    <ButtonLink href="/shops" variant="primary" size="sm">
                        View all shops
                    </ButtonLink>
                </div>
            )}
        </section>
    );
}
