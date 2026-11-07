import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

export function SellerBanner() {
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
                <ButtonLink href="/seller" variant="gold">
                    Open your shop
                    <Icon name="arrow-right" size={16} />
                </ButtonLink>
            </div>
            <span className="oi-seller-banner__mark" aria-hidden="true">
                ⌁
            </span>
        </section>
    );
}
