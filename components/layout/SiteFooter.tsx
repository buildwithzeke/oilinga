import type { Page } from "@/lib/data";
import { Logo } from "@/components/brand/Logo";

export interface SiteFooterProps {
    onNavigate?: (page: Page) => void;
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
    return (
        <footer className="oi-site-footer" id="footer">
            <div className="oi-container oi-footer__main">
                <div className="oi-footer__brand">
                    <Logo variant="light" alt="Oilinga" />
                </div>
                <p className="oi-footer__tagline">
                    Building a thriving agricultural marketplace in Africa.
                </p>
                <div className="oi-footer__socials">
                    <a className="oi-footer__social" href="#footer" aria-label="Oilinga on Facebook">
                        f
                    </a>
                    <a className="oi-footer__social" href="#footer" aria-label="Oilinga on Instagram">
                        ◎
                    </a>
                    <a className="oi-footer__social" href="#footer" aria-label="Oilinga on LinkedIn">
                        in
                    </a>
                </div>
            </div>

            <div className="oi-container oi-footer__bottom">
                <span>© 2026 Oilinga. Buy · Sell · Grow.</span>
                <nav className="oi-footer__links" aria-label="Footer">
                    <a
                        href="#about"
                        onClick={(event) => {
                            if (!onNavigate) return;
                            event.preventDefault();
                            onNavigate("about");
                        }}
                    >
                        About
                    </a>
                    <a href="#footer">Help centre</a>
                    <a href="#footer">Privacy</a>
                    <a href="#footer">Terms</a>
                    <a href="/design-system">Design system</a>
                </nav>
            </div>
        </footer>
    );
}
