"use client";

import { useState } from "react";
import type { Page, Product } from "@/lib/data";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutView } from "@/components/views/AboutView";
import { HomeView } from "@/components/views/HomeView";
import { MarketplaceView } from "@/components/views/MarketplaceView";
import { SellerDashboard } from "@/components/views/SellerDashboard";
import { useToast } from "@/components/ui/Toast";

export default function Home() {
    const [page, setPage] = useState<Page>("home");
    const notify = useToast();

    function navigate(next: Page) {
        setPage(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function addProduct(product: Product) {
        notify(`${product.name} added to your cart`);
    }

    return (
        <div className="oi-site">
            <a className="oi-skip-link" href="#main-content">
                Skip to content
            </a>

            <SiteHeader
                currentPage={page}
                onNavigate={navigate}
                onSearch={(value) => {
                    navigate("marketplace");
                    if (value) notify(`Showing results for “${value}”`);
                }}
            />

            <main id="main-content" className="oi-main">
                {page === "home" && <HomeView onNavigate={navigate} onAdd={addProduct} />}
                {page === "marketplace" && <MarketplaceView onAdd={addProduct} />}
                {page === "seller" && <SellerDashboard />}
                {page === "about" && <AboutView onNavigate={navigate} />}
            </main>

            <SiteFooter onNavigate={navigate} />
        </div>
    );
}
