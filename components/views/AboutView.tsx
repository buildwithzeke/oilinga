import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

export function AboutView() {
    return (
        <section className="oi-view oi-container" aria-labelledby="about-title">
            <div className="oi-about">
                <span className="oi-eyebrow oi-eyebrow--green">
                    Rooted in Africa. Growing together.
                </span>
                <h1 id="about-title" className="oi-about__title">
                    A marketplace built{" "}
                    <br />
                    to help every harvest thrive.
                </h1>
                <p className="oi-about__lede">
                    Oilinga connects palm oil and groundnut oil sellers, retailers and consumers
                    through a trusted marketplace. We make it easier for local businesses to reach
                    new buyers and simpler for everyone to find quality oils.
                </p>
                <ButtonLink href="/marketplace" variant="primary">
                    Explore Oilinga
                    <Icon name="arrow-right" size={16} />
                </ButtonLink>
                <img
                    className="oi-about__image"
                    src="/assets/brand/oilinga-brand-visual-reference.png"
                    alt="Oilinga brand identity"
                />
            </div>
        </section>
    );
}
