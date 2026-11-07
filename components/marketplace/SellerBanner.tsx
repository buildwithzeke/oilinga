"use client";

import type { Page } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export interface SellerBannerProps {
    onNavigate: (page: Page) => void;
}

export function SellerBanner({ onNavigate }: SellerBannerProps) {
    return (
        <section className="oi-seller-banner">
            <div>
                <span className="oi-eyebrow">Your business, growing</span>
                <h2 className="oi-seller-banner__title">
                    Bring your harvest{" "}
                    <br />
                    to the whole marketplace.
                </h2>
                <p className="oi-seller-banner__lede">
                    Reach new buyers, manage your orders and grow with a community that values
                    local producers.
                </p>
                <Button variant="gold" onClick={() => onNavigate("seller")}>
                    Open your shop
                    <Icon name="arrow-right" size={16} />
                </Button>
            </div>
            <div className="oi-seller-banner__mark" aria-hidden="true">
                🌴
            </div>
        </section>
    );
}
