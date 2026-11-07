import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <div className="oi-site">
            <a className="oi-skip-link" href="#main-content">
                Skip to content
            </a>
            <SiteHeader />
            <main id="main-content" className="oi-main">
                <section className="oi-not-found oi-view oi-container" aria-labelledby="not-found-title">
                    <span className="oi-not-found__code" aria-hidden="true">
                        404
                    </span>
                    <span className="oi-eyebrow oi-eyebrow--green">Nothing pressing here</span>
                    <h1 id="not-found-title">This page has been pressed out.</h1>
                    <p>
                        The link may be old, or the page may have moved. Head back to the
                        marketplace to keep exploring fresh oils and trusted producers.
                    </p>
                    <div className="oi-not-found__actions">
                        <ButtonLink href="/" variant="primary">
                            Back home
                            <Icon name="arrow-right" size={16} />
                        </ButtonLink>
                        <ButtonLink href="/marketplace" variant="outline">
                            Browse marketplace
                        </ButtonLink>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
